const dns = require('dns').promises;

const FREE_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'mail.com', 'protonmail.com', 'icloud.com',
  'yandex.com', 'zoho.com', 'gmx.com', 'live.com',
  'rediffmail.com', 'yahoo.co.in', 'yahoo.co.uk',
  'googlemail.com', 'msn.com', 'rocketmail.com',
  'mail.ru', 'inbox.com',
];

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

function extractEmails(text) {
  return [...new Set((text.match(EMAIL_REGEX) || []).map(e => e.toLowerCase()))];
}

function extractDomain(email) {
  return email.split('@')[1];
}

function isFreeProvider(domain) {
  return FREE_PROVIDERS.includes(domain.toLowerCase());
}

async function checkMxRecord(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

function domainMatchesCompany(emailDomain, companyDomain) {
  if (!companyDomain) return null;
  const cleanCompany = companyDomain.replace(/^www\./, '').toLowerCase();
  const cleanEmail = emailDomain.toLowerCase();
  return cleanEmail === cleanCompany || cleanCompany.endsWith('.' + cleanEmail) || cleanEmail.endsWith('.' + cleanCompany);
}

async function verifyEmails(text, companyDomain) {
  const emails = extractEmails(text);

  if (emails.length === 0) {
    return {
      emailsFound: [],
      overallRisk: 'low',
      riskContribution: 0,
      details: 'No email addresses found in the posting.',
    };
  }

  const results = await Promise.all(
    emails.map(async (email) => {
      const domain = extractDomain(email);
      const free = isFreeProvider(domain);
      const matchesCompany = domainMatchesCompany(domain, companyDomain);
      const hasMxRecord = await checkMxRecord(domain);

      return { email, domain, isFreeProvider: free, matchesCompany, hasMxRecord };
    })
  );

  // Calculate risk
  let riskContribution = 0;
  const freeCount = results.filter(r => r.isFreeProvider).length;
  const mismatchCount = results.filter(r => r.matchesCompany === false).length;
  const noMxCount = results.filter(r => !r.hasMxRecord).length;

  if (freeCount === emails.length) {
    riskContribution += 15;
  } else if (freeCount > 0) {
    riskContribution += 5;
  }

  if (mismatchCount > 0) {
    riskContribution += 10;
  }

  if (noMxCount > 0) {
    riskContribution += 10;
  }

  riskContribution = Math.min(riskContribution, 20);

  let overallRisk;
  if (riskContribution >= 15) overallRisk = 'high';
  else if (riskContribution >= 8) overallRisk = 'medium';
  else overallRisk = 'low';

  let details;
  if (freeCount === emails.length && emails.length > 0) {
    details = `All ${emails.length} email(s) use free providers (e.g., Gmail, Yahoo). Legitimate companies typically use corporate email domains.`;
  } else if (mismatchCount > 0) {
    details = 'Email domain does not match the company\'s official domain. This could indicate impersonation.';
  } else if (freeCount > 0) {
    details = 'Mix of corporate and free email addresses found. Verify the corporate email is genuine.';
  } else if (noMxCount > 0) {
    details = 'Some email domains have no valid mail server records, which is suspicious.';
  } else {
    details = 'Email addresses appear to use legitimate corporate domains.';
  }

  return { emailsFound: results, overallRisk, riskContribution, details };
}

module.exports = { verifyEmails, extractEmails, isFreeProvider };
