const scamKeywords = require("./scamKeywords");

/**
 * Scan text against the keyword list and return matched reasons + raw score.
 */
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

/**
 * Merge keyword-based and AI-based analyses into a single risk score (0-95).
 *
 * Weighting: 40% keyword scan, 60% AI analysis.
 * The keyword raw score is capped at 100 before weighting.
 * Final score is capped at 95 to reflect realistic uncertainty.
 */
function calculateRisk(keywordResult, aiResult) {
  const kwScore = Math.min(keywordResult.score, 100);

  const aiScore =
    typeof aiResult.riskScore === "number"
      ? Math.min(Math.max(aiResult.riskScore, 0), 100)
      : 0;

  const combined = Math.round(kwScore * 0.4 + aiScore * 0.6);
  
  // Cap at 95 to reflect realistic uncertainty (no AI is 100% certain)
  const finalScore = Math.min(Math.max(combined, 0), 95);

  // Merge reasons, AI reasons first, then keyword-only extras
  const aiReasons = Array.isArray(aiResult.reasons) ? aiResult.reasons : [];
  const allReasons = [...new Set([...aiReasons, ...keywordResult.reasons])];

  let status;
  if (finalScore >= 70) status = "High Risk";
  else if (finalScore >= 40) status = "Medium Risk";
  else status = "Low Risk";

  return { riskScore: finalScore, status, reasons: allReasons };
}

/**
 * Enhanced risk calculation incorporating pattern learning, website safety,
 * company verification, and email verification signals.
 *
 * Weighting: 30% keyword + 10% patterns + 50% AI + bonus (up to 25 pts).
 */
function calculateEnhancedRisk(keywordResult, patternResult, aiResult, websiteResult, companyResult, emailResult) {
  const kwScore = Math.min(keywordResult.score, 100);
  const aiScore =
    typeof aiResult.riskScore === "number"
      ? Math.min(Math.max(aiResult.riskScore, 0), 100)
      : 0;
  const patternScore = Math.min(patternResult?.score || 0, 100);

  // Bonus risk from new features (capped at 25 total)
  let bonusRisk = 0;
  if (websiteResult && websiteResult.score) {
    bonusRisk += Math.min(websiteResult.score * 0.15, 10);
  }
  if (companyResult && companyResult.riskContribution) {
    bonusRisk += Math.min(companyResult.riskContribution, 10);
  }
  if (emailResult && emailResult.riskContribution) {
    bonusRisk += Math.min(emailResult.riskContribution, 10);
  }
  bonusRisk = Math.min(bonusRisk, 25);

  const combined = Math.round(
    kwScore * 0.30 +
    patternScore * 0.10 +
    aiScore * 0.50 +
    bonusRisk
  );

  const finalScore = Math.min(Math.max(combined, 0), 95);

  // Merge all reasons, deduplicated
  const aiReasons = Array.isArray(aiResult.reasons) ? aiResult.reasons : [];
  const allReasons = [...new Set([
    ...aiReasons,
    ...keywordResult.reasons,
    ...(patternResult?.reasons || []),
  ])];

  let status;
  if (finalScore >= 70) status = "High Risk";
  else if (finalScore >= 40) status = "Medium Risk";
  else status = "Low Risk";

  return { riskScore: finalScore, status, reasons: allReasons };
}

module.exports = { keywordScan, calculateRisk, calculateEnhancedRisk };
