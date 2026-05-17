// Vercel Serverless Function for Internship Analysis
// Includes: Email Verification, Website Safety, Company Verification, Enhanced Grok prompt
const axios = require("axios");
const dns = require("dns").promises;
const tls = require("tls");

// ──── Scam Keywords (synced with backend/utils/scamKeywords.js) ────
const scamKeywords = [
  // Payment / fee related
  { keyword: "registration fee", weight: 20, reason: "Registration fee detected" },
  { keyword: "processing fee", weight: 20, reason: "Processing fee detected" },
  { keyword: "security deposit", weight: 18, reason: "Security deposit request detected" },
  { keyword: "pay to join", weight: 22, reason: "Pay-to-join scheme detected" },
  { keyword: "payment required", weight: 20, reason: "Upfront payment required" },
  { keyword: "fee", weight: 10, reason: "Monetary fee mentioned" },
  { keyword: "₹", weight: 5, reason: "Currency amount mentioned in context of fees" },
  { keyword: "pay ₹", weight: 18, reason: "Direct payment request detected" },
  { keyword: "bank transfer", weight: 12, reason: "Bank transfer request detected" },
  { keyword: "upi", weight: 8, reason: "UPI payment method mentioned" },
  { keyword: "training fee", weight: 14, reason: "Charging for training is a red flag" },
  { keyword: "certificate fee", weight: 12, reason: "Charging for certificates is suspicious" },
  // Unrealistic promises
  { keyword: "guaranteed placement", weight: 18, reason: "Unrealistic guarantee of job" },
  { keyword: "100% placement", weight: 20, reason: "Unrealistic 100% placement guarantee" },
  { keyword: "guaranteed job", weight: 18, reason: "Unrealistic guarantee of job" },
  { keyword: "earn from day 1", weight: 15, reason: "Unrealistic earning promise" },
  { keyword: "earn while you learn", weight: 8, reason: "Potentially misleading earning claim" },
  { keyword: "no experience required", weight: 6, reason: "No-experience claim may be a red flag" },
  { keyword: "no experience", weight: 5, reason: "Too good to be true" },
  { keyword: "no skills needed", weight: 12, reason: "No-skills-needed claim is suspicious" },
  { keyword: "immediate joining", weight: 8, reason: "Urgency tactic detected" },
  { keyword: "earn money", weight: 7, reason: "Focus on money rather than learning" },
  { keyword: "no interview", weight: 8, reason: "Skipping proper hiring process" },
  // Pressure tactics
  { keyword: "limited seats", weight: 14, reason: "Artificial scarcity / urgency tactic" },
  { keyword: "hurry", weight: 10, reason: "Urgency pressure tactic detected" },
  { keyword: "last date", weight: 6, reason: "Deadline pressure tactic" },
  { keyword: "confirm your seat", weight: 14, reason: "Seat-confirmation pressure tactic" },
  { keyword: "apply now", weight: 4, reason: "Urgency language detected" },
  { keyword: "offer expires", weight: 14, reason: "Expiration urgency tactic" },
  { keyword: "act fast", weight: 12, reason: "High-pressure urgency tactic" },
  { keyword: "limited time", weight: 8, reason: "Creates false urgency" },
  { keyword: "limited offer", weight: 8, reason: "Pressure tactics" },
  { keyword: "don't miss", weight: 6, reason: "FOMO tactics" },
  { keyword: "golden opportunity", weight: 7, reason: "Exaggerated claims" },
  { keyword: "selected", weight: 7, reason: "Claiming pre-selection without application" },
  { keyword: "congratulations", weight: 7, reason: "Fake selection messages" },
  // Suspicious wording
  { keyword: "whatsapp", weight: 10, reason: "Communication via WhatsApp instead of official channels" },
  { keyword: "telegram", weight: 10, reason: "Communication via Telegram instead of official channels" },
  { keyword: "dm us", weight: 10, reason: "Informal communication channel" },
  { keyword: "personal email", weight: 8, reason: "Personal email used instead of corporate" },
  { keyword: "gmail.com", weight: 6, reason: "Free email provider used for recruitment" },
  { keyword: "yahoo.com", weight: 6, reason: "Free email provider used for recruitment" },
  { keyword: "work from home", weight: 4, reason: "Work-from-home claim (context-dependent)" },
  { keyword: "certificate provided", weight: 3, reason: "Certificate claim (common in paid scams)" },
  { keyword: "stipend after training", weight: 10, reason: "Delayed stipend after unpaid training period" },
  { keyword: "training period unpaid", weight: 14, reason: "Unpaid training period is a red flag" },
  { keyword: "click here", weight: 5, reason: "Potential phishing" },
];

// ──── Keyword Scan ────
function keywordScan(text) {
  const lower = text.toLowerCase();
  const matched = [];
  let score = 0;
  for (const entry of scamKeywords) {
    if (lower.includes(entry.keyword)) {
      score += entry.weight;
      matched.push(entry.reason);
    }
  }
  return { score, reasons: [...new Set(matched)] };
}

// ──── Email Verification (Feature 4) ────
const FREE_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'mail.com', 'protonmail.com', 'icloud.com',
  'yandex.com', 'zoho.com', 'gmx.com', 'live.com',
  'rediffmail.com', 'yahoo.co.in', 'yahoo.co.uk',
];
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

async function verifyEmails(text, companyDomain) {
  const emails = [...new Set((text.match(EMAIL_REGEX) || []).map(e => e.toLowerCase()))];
  if (emails.length === 0) {
    return { emailsFound: [], overallRisk: 'low', riskContribution: 0, details: 'No email addresses found in the posting.' };
  }

  const results = await Promise.all(emails.map(async (email) => {
    const domain = email.split('@')[1];
    const isFree = FREE_PROVIDERS.includes(domain);
    let matchesCompany = null;
    if (companyDomain) {
      const clean = companyDomain.replace(/^www\./, '').toLowerCase();
      matchesCompany = domain === clean || clean.endsWith('.' + domain) || domain.endsWith('.' + clean);
    }
    let hasMxRecord = false;
    try { const mx = await dns.resolveMx(domain); hasMxRecord = mx && mx.length > 0; } catch {}
    return { email, domain, isFreeProvider: isFree, matchesCompany, hasMxRecord };
  }));

  let riskContribution = 0;
  const freeCount = results.filter(r => r.isFreeProvider).length;
  if (freeCount === emails.length) riskContribution += 15;
  else if (freeCount > 0) riskContribution += 5;
  if (results.some(r => r.matchesCompany === false)) riskContribution += 10;
  if (results.some(r => !r.hasMxRecord)) riskContribution += 10;
  riskContribution = Math.min(riskContribution, 20);

  const overallRisk = riskContribution >= 15 ? 'high' : riskContribution >= 8 ? 'medium' : 'low';
  let details = freeCount === emails.length
    ? `All ${emails.length} email(s) use free providers. Legitimate companies use corporate email domains.`
    : results.some(r => r.matchesCompany === false)
    ? 'Email domain does not match the company\'s official domain.'
    : freeCount > 0 ? 'Mix of corporate and free email addresses found.' : 'Email addresses appear to use legitimate corporate domains.';

  return { emailsFound: results, overallRisk, riskContribution, details };
}

// ──── Website Safety Scanner (Feature 2) ────
async function checkSSL(hostname) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(443, hostname, { servername: hostname, rejectUnauthorized: false }, () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        if (!cert || !cert.valid_to) { resolve({ passed: false, details: 'Could not retrieve SSL certificate', certNotBefore: null }); return; }
        const now = new Date();
        if (now > new Date(cert.valid_to)) resolve({ passed: false, details: 'SSL certificate has expired', certNotBefore: cert.valid_from });
        else resolve({ passed: true, details: `Valid SSL certificate (expires ${cert.valid_to})`, certNotBefore: cert.valid_from });
      });
      socket.on('error', () => resolve({ passed: false, details: 'SSL connection failed', certNotBefore: null }));
      socket.setTimeout(5000, () => { socket.destroy(); resolve({ passed: false, details: 'SSL check timed out', certNotBefore: null }); });
    } catch { resolve({ passed: false, details: 'SSL check failed', certNotBefore: null }); }
  });
}

async function scanWebsite(urlString) {
  try {
    const parsed = new URL(urlString);
    const hostname = parsed.hostname;

    const ssl = parsed.protocol === 'https:'
      ? await checkSSL(hostname)
      : { passed: false, details: 'Site uses HTTP — no SSL encryption', certNotBefore: null };

    let domainAge = { passed: true, details: 'Domain appears established' };
    if (ssl.certNotBefore) {
      const days = (Date.now() - new Date(ssl.certNotBefore).getTime()) / (1000 * 60 * 60 * 24);
      if (days < 30) domainAge = { passed: false, details: `SSL certificate issued less than ${days < 7 ? '7' : '30'} days ago` };
    }

    let headers = { passed: false, details: 'Could not check security headers', missing: [] };
    try {
      const resp = await axios.head(urlString, { timeout: 5000, validateStatus: () => true, maxRedirects: 3 });
      const required = ['strict-transport-security', 'x-content-type-options', 'x-frame-options', 'content-security-policy', 'x-xss-protection'];
      const missing = required.filter(h => !resp.headers[h]);
      headers = { passed: missing.length <= 2, details: `${required.length - missing.length}/${required.length} security headers present`, missing };
    } catch {}

    const flags = [];
    let urlPassed = true;
    if (parsed.protocol === 'http:') { flags.push('Uses HTTP instead of HTTPS'); urlPassed = false; }
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) { flags.push('URL uses an IP address'); urlPassed = false; }
    if (hostname.split('.').length > 4) { flags.push('Excessive subdomains'); urlPassed = false; }

    let score = 0;
    if (!ssl.passed) score += 30;
    if (!domainAge.passed) score += 20;
    if (!headers.passed) score += (headers.missing?.length >= 4 ? 20 : 10);
    if (!urlPassed) score += 15;
    score = Math.min(score, 100);

    return {
      overallSafe: score < 40,
      score,
      checks: {
        ssl: { passed: ssl.passed, details: ssl.details },
        domainAge: { passed: domainAge.passed, details: domainAge.details },
        securityHeaders: { passed: headers.passed, details: headers.details, missing: headers.missing },
        urlStructure: { passed: urlPassed, details: flags.length ? flags.join('. ') : 'URL structure appears normal', flags },
      },
    };
  } catch {
    return null;
  }
}

// ──── Company Verification (Feature 3) ────
const COMPANY_PATTERNS = [
  /(?:company|organization|firm|employer)[\s:]+([A-Z][A-Za-z\s&.,']+?(?:Ltd|Pvt|Inc|LLC|Corp|Solutions|Technologies|Tech|Services|Group|International)?)\b/i,
  /(?:at|with|for|join)\s+([A-Z][A-Za-z\s&.,']{2,40}(?:Ltd|Pvt|Inc|LLC|Corp|Solutions|Technologies|Tech|Services|Group|International))\b/i,
  /(?:internship\s+at|position\s+at|role\s+at)\s+([A-Z][A-Za-z\s&.,']{2,50})\b/i,
];

function extractCompanyName(text) {
  for (const pattern of COMPANY_PATTERNS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim().replace(/[,.]$/, '');
      if (name.length >= 2 && name.length <= 60) return name;
    }
  }
  return null;
}

function verifyCompany(text, companyName, grokResult) {
  const result = {
    companyName: companyName || grokResult?.companyName || null,
    isVerifiable: false, confidence: 'low', details: '', flags: [], riskContribution: 0,
  };
  if (grokResult) {
    result.isVerifiable = grokResult.isVerifiable ?? false;
    result.confidence = grokResult.confidence || 'low';
    result.details = grokResult.details || '';
    result.flags = Array.isArray(grokResult.flags) ? grokResult.flags : [];
  }
  if (!result.companyName) {
    result.details = 'No company name could be identified in the posting.';
    result.flags.push('No identifiable company name');
    result.riskContribution = 15;
    return result;
  }
  if (!result.isVerifiable) {
    result.riskContribution = Math.min(result.riskContribution + 10, 20);
    if (!result.details) result.details = `The company "${result.companyName}" has limited or no verifiable online presence.`;
  } else if (!result.details) {
    result.details = `The company "${result.companyName}" appears to have a verifiable online presence.`;
  }
  if (result.confidence === 'high' && result.isVerifiable) result.riskContribution = 0;
  else if (result.confidence === 'medium') result.riskContribution = Math.max(result.riskContribution, 5);
  else result.riskContribution = Math.max(result.riskContribution, 10);
  result.riskContribution = Math.min(result.riskContribution, 20);
  return result;
}

// ──── Prompt Injection Sanitization ────
function sanitizeInput(text) {
  let cleaned = text;
  cleaned = cleaned.replace(/ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi, '[filtered]');
  cleaned = cleaned.replace(/you\s+are\s+(now|actually)\s+/gi, '[filtered]');
  cleaned = cleaned.replace(/system\s*:\s*/gi, '[filtered]');
  cleaned = cleaned.replace(/\bact\s+as\s+(a|an)\s+/gi, '[filtered]');
  cleaned = cleaned.replace(/respond\s+with\s+.*riskScore\s*:\s*0/gi, '[filtered]');
  cleaned = cleaned.replace(/return\s+.*"riskScore"\s*:\s*0/gi, '[filtered]');
  return cleaned.slice(0, 5000);
}

// ──── Grok API Analysis (Enhanced) ────
async function analyzeWithGrok(text) {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) throw new Error("GROK_API_KEY not configured");

  const sanitizedText = sanitizeInput(text);

  const prompt = `Analyze this internship posting for scam indicators. Provide:
1. Risk score (0-100)
2. List of red flags
3. Brief summary
4. Company verification assessment

Internship posting:
${sanitizedText}

Respond in JSON format:
{
  "riskScore": <number 0-100>,
  "reasons": ["reason1", "reason2"],
  "summary": "brief explanation",
  "companyVerification": {
    "companyName": "detected company name or null",
    "isVerifiable": true or false,
    "confidence": "high" or "medium" or "low",
    "details": "explanation",
    "flags": ["flag1"]
  }
}`;

  try {
    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        messages: [
          { role: "system", content: "You are an expert at detecting scam internship postings. Analyze carefully and provide accurate risk assessments. If a company is mentioned, verify if it is a known, real company." },
          { role: "user", content: prompt },
        ],
        model: "grok-2-latest",
        temperature: 0.3,
      },
      {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        timeout: 30000,
      }
    );

    const content = response.data.choices[0]?.message?.content || "{}";
    const cleaned = content.replace(/```(?:json)?\s*/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      riskScore: parsed.riskScore || 0,
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons : [],
      summary: parsed.summary || "",
      companyVerification: parsed.companyVerification || null,
    };
  } catch (error) {
    console.error("Grok API error:", error.message);
    throw error;
  }
}

// ──── Enhanced Risk Calculator ────
function calculateEnhancedRisk(keywordResult, aiResult, websiteResult, companyResult, emailResult) {
  const kwScore = Math.min(keywordResult.score, 100);
  const aiScore = typeof aiResult.riskScore === "number" ? Math.min(Math.max(aiResult.riskScore, 0), 100) : 0;

  let bonusRisk = 0;
  if (websiteResult?.score) bonusRisk += Math.min(websiteResult.score * 0.15, 10);
  if (companyResult?.riskContribution) bonusRisk += Math.min(companyResult.riskContribution, 10);
  if (emailResult?.riskContribution) bonusRisk += Math.min(emailResult.riskContribution, 10);
  bonusRisk = Math.min(bonusRisk, 25);

  const combined = Math.round(kwScore * 0.35 + aiScore * 0.55 + bonusRisk);
  const finalScore = Math.min(Math.max(combined, 0), 95);

  const allReasons = [...new Set([
    ...(Array.isArray(aiResult.reasons) ? aiResult.reasons : []),
    ...keywordResult.reasons,
  ])];

  let status;
  if (finalScore >= 70) status = "High Risk";
  else if (finalScore >= 40) status = "Medium Risk";
  else status = "Low Risk";

  return { riskScore: finalScore, status, reasons: allReasons };
}

// ──── Fetch Text from URL ────
async function fetchTextFromUrl(url) {
  const response = await axios.get(url, {
    timeout: 15000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FakeInternshipDetector/1.0)" },
  });
  const html = typeof response.data === "string" ? response.data : String(response.data);
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();
  if (!text) throw new Error("Could not extract text content from the provided URL");
  return text.slice(0, 4000);
}

// ──── Main Analysis ────
async function analyzeInternship({ text, url }) {
  let content = text;
  if (!content && url) content = await fetchTextFromUrl(url);
  if (!content || content.trim().length === 0) throw new Error("No internship text or URL provided for analysis");

  let companyDomain = null;
  try { companyDomain = url ? new URL(url).hostname.replace(/^www\./, '') : null; } catch {}

  const [kwSettled, aiSettled, wsSettled, emSettled] = await Promise.allSettled([
    Promise.resolve(keywordScan(content)),
    analyzeWithGrok(content),
    url ? scanWebsite(url) : Promise.resolve(null),
    verifyEmails(content, companyDomain),
  ]);

  const kw = kwSettled.status === 'fulfilled' ? kwSettled.value : { score: 0, reasons: [] };
  const ai = aiSettled.status === 'fulfilled' ? aiSettled.value : { riskScore: 0, reasons: [], summary: '' };
  const ws = wsSettled.status === 'fulfilled' ? wsSettled.value : null;
  const em = emSettled.status === 'fulfilled' ? emSettled.value : null;
  const aiAvailable = aiSettled.status === 'fulfilled';

  const companyName = extractCompanyName(content);
  const cv = verifyCompany(content, companyName, ai.companyVerification || null);

  let result;
  if (aiAvailable) {
    result = calculateEnhancedRisk(kw, ai, ws, cv, em);
  } else {
    const kwScore = Math.min(kw.score, 100);
    const finalScore = Math.min(Math.max(kwScore, 0), 95);
    result = {
      riskScore: finalScore,
      status: finalScore >= 70 ? "High Risk" : finalScore >= 40 ? "Medium Risk" : "Low Risk",
      reasons: kw.reasons,
    };
  }

  result.aiAvailable = aiAvailable;
  if (ai.summary) result.summary = ai.summary;
  if (ws) result.websiteSafety = ws;
  if (cv) result.companyVerification = cv;
  if (em) result.emailVerification = em;

  return result;
}

// ──── Vercel Handler ────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { text, url } = req.body;
    if (!text && !url) return res.status(400).json({ error: "Request must include either 'text' or 'url' field" });
    if (url && !/^https?:\/\/.+/i.test(url)) return res.status(400).json({ error: "Invalid URL format. Must start with http:// or https://" });

    const result = await analyzeInternship({ text, url });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Analysis error:", err.message);
    return res.status(500).json({ success: false, error: "Analysis failed", message: err.message });
  }
}
