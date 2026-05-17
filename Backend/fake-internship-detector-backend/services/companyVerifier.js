const COMPANY_PATTERNS = [
  /(?:company|organization|firm|employer|hired?\s+by|offered?\s+by|posted?\s+by)[\s:]+([A-Z][A-Za-z\s&.,']+?(?:Ltd|Pvt|Inc|LLC|Corp|Solutions|Technologies|Tech|Services|Group|International|Enterprises|Consulting|Digital|Labs|Studio|Media|Academy|Institute|Foundation)?)\b/i,
  /(?:at|with|for|join|from)\s+([A-Z][A-Za-z\s&.,']{2,40}(?:Ltd|Pvt|Inc|LLC|Corp|Solutions|Technologies|Tech|Services|Group|International|Enterprises|Consulting))\b/i,
  /(?:internship\s+at|position\s+at|role\s+at|opportunity\s+at)\s+([A-Z][A-Za-z\s&.,']{2,50})\b/i,
];

function extractCompanyName(text) {
  for (const pattern of COMPANY_PATTERNS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim().replace(/[,.]$/, '').trim();
      // Filter out common false positives
      const falsePositives = ['Apply Now', 'Click Here', 'Contact Us', 'Visit Our', 'Dear Candidate', 'Dear Student'];
      if (falsePositives.some(fp => name.toLowerCase().startsWith(fp.toLowerCase()))) continue;
      if (name.length < 2 || name.length > 60) continue;
      return name;
    }
  }
  return null;
}

function extractCompanyDomain(urlString) {
  if (!urlString) return null;
  try {
    const parsed = new URL(urlString);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/**
 * Merge regex-extracted company name with Grok AI's company verification data.
 */
function verifyCompany(text, companyName, grokCompanyResult) {
  const result = {
    companyName: companyName || (grokCompanyResult?.companyName) || null,
    isVerifiable: false,
    confidence: 'low',
    details: '',
    flags: [],
    riskContribution: 0,
  };

  // If Grok provided company verification, use it as primary source
  if (grokCompanyResult) {
    result.isVerifiable = grokCompanyResult.isVerifiable ?? false;
    result.confidence = grokCompanyResult.confidence || 'low';
    result.details = grokCompanyResult.details || '';
    result.flags = Array.isArray(grokCompanyResult.flags) ? grokCompanyResult.flags : [];

    if (!result.companyName) {
      result.companyName = grokCompanyResult.companyName || null;
    }
  }

  // If no company name found at all
  if (!result.companyName) {
    result.details = 'No company name could be identified in the posting. This is a significant red flag.';
    result.flags.push('No identifiable company name');
    result.riskContribution = 15;
    result.confidence = 'low';
    return result;
  }

  // Check for suspicious company name patterns
  const lowerName = result.companyName.toLowerCase();
  if (lowerName.length < 3) {
    result.flags.push('Company name is suspiciously short');
    result.riskContribution += 5;
  }
  if (/^[a-z]+\s*(tech|solutions|services|digital|global|international)$/i.test(result.companyName) && !result.isVerifiable) {
    result.flags.push('Generic company name pattern — common in scams');
    result.riskContribution += 5;
  }

  // Calculate risk based on confidence
  if (result.confidence === 'high' && result.isVerifiable) {
    result.riskContribution = Math.max(result.riskContribution, 0);
  } else if (result.confidence === 'medium') {
    result.riskContribution = Math.max(result.riskContribution, 5);
  } else {
    result.riskContribution = Math.max(result.riskContribution, 10);
  }

  if (!result.isVerifiable) {
    result.riskContribution = Math.min(result.riskContribution + 10, 20);
    if (!result.details) {
      result.details = `The company "${result.companyName}" could not be verified through known business databases or online presence.`;
    }
  }

  if (!result.details) {
    result.details = result.isVerifiable
      ? `The company "${result.companyName}" appears to have a verifiable online presence.`
      : `The company "${result.companyName}" has limited or no verifiable online presence.`;
  }

  result.riskContribution = Math.min(result.riskContribution, 20);
  return result;
}

module.exports = { extractCompanyName, extractCompanyDomain, verifyCompany };
