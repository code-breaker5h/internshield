const tls = require('tls');
const dns = require('dns').promises;
const url = require('url');
const axios = require('axios');

const KNOWN_BRANDS = [
  'linkedin', 'internshala', 'google', 'microsoft', 'amazon',
  'infosys', 'tcs', 'wipro', 'facebook', 'meta', 'apple',
  'netflix', 'twitter', 'uber', 'flipkart', 'swiggy', 'zomato',
  'paytm', 'phonepe', 'razorpay', 'byju', 'unacademy',
];

function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

async function checkSSL(hostname) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(443, hostname, { servername: hostname, rejectUnauthorized: false }, () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        if (!cert || !cert.valid_to) {
          resolve({ passed: false, details: 'Could not retrieve SSL certificate', certNotBefore: null });
          return;
        }
        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const now = new Date();
        if (now > validTo) {
          resolve({ passed: false, details: 'SSL certificate has expired', certNotBefore: cert.valid_from });
        } else {
          resolve({ passed: true, details: `Valid SSL certificate (expires ${cert.valid_to})`, certNotBefore: cert.valid_from });
        }
      });
      socket.on('error', () => {
        resolve({ passed: false, details: 'SSL connection failed — site may not support HTTPS', certNotBefore: null });
      });
      socket.setTimeout(5000, () => {
        socket.destroy();
        resolve({ passed: false, details: 'SSL check timed out', certNotBefore: null });
      });
    } catch {
      resolve({ passed: false, details: 'SSL check failed', certNotBefore: null });
    }
  });
}

async function checkDomainAge(hostname, certNotBefore) {
  const flags = [];
  let passed = true;

  // Check SSL cert issue date as a proxy for domain age
  if (certNotBefore) {
    const issueDate = new Date(certNotBefore);
    const now = new Date();
    const daysSinceIssue = (now - issueDate) / (1000 * 60 * 60 * 24);
    if (daysSinceIssue < 7) {
      passed = false;
      flags.push('SSL certificate issued less than 7 days ago');
    } else if (daysSinceIssue < 30) {
      passed = false;
      flags.push('SSL certificate issued less than 30 days ago');
    }
  }

  // Check for SOA record
  try {
    await dns.resolveSoa(hostname);
  } catch {
    passed = false;
    flags.push('No SOA record found — domain may not be properly registered');
  }

  // Check for NS records
  try {
    await dns.resolveNs(hostname);
  } catch {
    flags.push('No NS records found');
  }

  const details = flags.length > 0
    ? flags.join('. ')
    : 'Domain appears to be established with proper DNS records';

  return { passed, details };
}

async function checkSecurityHeaders(urlString) {
  const requiredHeaders = [
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'content-security-policy',
    'x-xss-protection',
  ];

  try {
    const response = await axios.head(urlString, {
      timeout: 5000,
      validateStatus: () => true,
      maxRedirects: 3,
    });

    const headers = response.headers;
    const missing = requiredHeaders.filter(h => !headers[h]);
    const present = requiredHeaders.filter(h => headers[h]);

    const passed = missing.length <= 2; // Allow up to 2 missing headers
    const details = present.length > 0
      ? `${present.length}/${requiredHeaders.length} security headers present. Missing: ${missing.join(', ') || 'none'}`
      : 'No security headers detected — website may not follow security best practices';

    return { passed, details, missing };
  } catch {
    return {
      passed: false,
      details: 'Could not check security headers — website may be unreachable',
      missing: requiredHeaders,
    };
  }
}

function checkURLStructure(urlString) {
  const flags = [];
  let passed = true;

  try {
    const parsed = new URL(urlString);

    // Check for HTTP (not HTTPS)
    if (parsed.protocol === 'http:') {
      flags.push('Uses HTTP instead of HTTPS');
      passed = false;
    }

    // Check if hostname is an IP address
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(parsed.hostname)) {
      flags.push('URL uses an IP address instead of a domain name');
      passed = false;
    }

    // Check for excessive subdomains
    const parts = parsed.hostname.split('.');
    if (parts.length > 4) {
      flags.push('Excessive subdomains detected');
      passed = false;
    }

    // Check for brand typosquatting
    const hostLower = parsed.hostname.replace(/\./g, '').toLowerCase();
    for (const brand of KNOWN_BRANDS) {
      if (hostLower === brand) continue; // exact match is fine
      const dist = levenshteinDistance(hostLower.replace(/[^a-z]/g, ''), brand);
      if (dist > 0 && dist <= 2 && hostLower.includes(brand.substring(0, 3))) {
        flags.push(`Domain resembles "${brand}" — possible typosquatting`);
        passed = false;
        break;
      }
    }

    // Check for suspicious path patterns
    if (parsed.pathname.includes('@') || parsed.pathname.includes('//')) {
      flags.push('Suspicious characters in URL path');
      passed = false;
    }

    // Check for excessively long URLs
    if (urlString.length > 200) {
      flags.push('Excessively long URL');
    }
  } catch {
    flags.push('Invalid URL format');
    passed = false;
  }

  return {
    passed,
    details: flags.length > 0 ? flags.join('. ') : 'URL structure appears normal',
    flags,
  };
}

async function scanWebsite(urlString) {
  try {
    const parsed = new URL(urlString);
    const hostname = parsed.hostname;

    // Run all checks in parallel
    const [sslResult, headersResult, urlStructureResult] = await Promise.allSettled([
      parsed.protocol === 'https:'
        ? checkSSL(hostname)
        : Promise.resolve({ passed: false, details: 'Site uses HTTP — no SSL encryption', certNotBefore: null }),
      checkSecurityHeaders(urlString),
      Promise.resolve(checkURLStructure(urlString)),
    ]);

    const ssl = sslResult.status === 'fulfilled' ? sslResult.value : { passed: false, details: 'SSL check failed' };
    const headers = headersResult.status === 'fulfilled' ? headersResult.value : { passed: false, details: 'Header check failed', missing: [] };
    const urlStructure = urlStructureResult.status === 'fulfilled' ? urlStructureResult.value : { passed: true, details: 'OK', flags: [] };

    // Domain age check (depends on SSL cert data)
    const domainAge = await checkDomainAge(hostname, ssl.certNotBefore);

    // Calculate score
    let score = 0;
    if (!ssl.passed) score += 30;
    if (!domainAge.passed) score += 20;
    if (!headers.passed) score += (headers.missing?.length >= 4 ? 20 : 10);
    if (!urlStructure.passed) score += 15 * Math.min(urlStructure.flags.length, 2);
    score = Math.min(score, 100);

    return {
      overallSafe: score < 40,
      score,
      checks: {
        ssl: { passed: ssl.passed, details: ssl.details },
        domainAge: { passed: domainAge.passed, details: domainAge.details },
        securityHeaders: { passed: headers.passed, details: headers.details, missing: headers.missing || [] },
        urlStructure: { passed: urlStructure.passed, details: urlStructure.details, flags: urlStructure.flags || [] },
      },
    };
  } catch (error) {
    return {
      overallSafe: false,
      score: 50,
      checks: {
        ssl: { passed: false, details: 'Could not analyze website' },
        domainAge: { passed: false, details: 'Could not analyze website' },
        securityHeaders: { passed: false, details: 'Could not analyze website', missing: [] },
        urlStructure: { passed: false, details: error.message, flags: [] },
      },
    };
  }
}

module.exports = { scanWebsite };
