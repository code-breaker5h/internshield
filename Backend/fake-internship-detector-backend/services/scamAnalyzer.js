const axios = require("axios");
const { analyzeWithGrok } = require("./grokService");
const { keywordScan, calculateRisk, calculateEnhancedRisk } = require("../utils/riskCalculator");
const { scanPatterns, learnFromAiResponse } = require("./patternLearner");
const { scanWebsite } = require("./websiteScanner");
const { extractCompanyName, extractCompanyDomain, verifyCompany } = require("./companyVerifier");
const { verifyEmails } = require("./emailVerifier");

/**
 * Fetch text content from a URL (basic HTML -> plain-text extraction).
 */
async function fetchTextFromUrl(url) {
  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; FakeInternshipDetector/1.0; +https://github.com)",
    },
  });

  const html = typeof response.data === "string" ? response.data : String(response.data);

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) {
    throw new Error("Could not extract text content from the provided URL");
  }

  return text.slice(0, 4000);
}

/**
 * Main analysis pipeline — runs keyword scan, pattern scan, AI analysis,
 * website safety scan, company verification, and email verification.
 */
async function analyzeInternship({ text, url }) {
  let content = text;
  if (!content && url) {
    content = await fetchTextFromUrl(url);
  }

  if (!content || content.trim().length === 0) {
    throw new Error("No internship text or URL provided for analysis");
  }

  // Extract company domain from URL for email comparison
  const companyDomain = extractCompanyDomain(url);

  // Run all independent checks in parallel
  const [keywordSettled, patternSettled, aiSettled, websiteSettled, emailSettled] =
    await Promise.allSettled([
      Promise.resolve(keywordScan(content)),
      scanPatterns(content),
      analyzeWithGrok(content),
      url ? scanWebsite(url) : Promise.resolve(null),
      verifyEmails(content, companyDomain),
    ]);

  // Extract results with safe fallbacks
  const keywordResult = keywordSettled.status === "fulfilled"
    ? keywordSettled.value : { score: 0, reasons: [] };
  const patternResult = patternSettled.status === "fulfilled"
    ? patternSettled.value : { score: 0, reasons: [], matchedPatterns: [] };
  const aiResult = aiSettled.status === "fulfilled"
    ? aiSettled.value : { riskScore: 0, reasons: [], summary: "" };
  const websiteResult = websiteSettled.status === "fulfilled"
    ? websiteSettled.value : null;
  const emailResult = emailSettled.status === "fulfilled"
    ? emailSettled.value : null;

  const aiAvailable = aiSettled.status === "fulfilled";

  // Log failures for debugging
  if (aiSettled.status === "rejected") {
    console.warn("Grok AI analysis failed, using fallback:", aiSettled.reason?.message);
  }
  if (patternSettled.status === "rejected") {
    console.warn("Pattern scan failed:", patternSettled.reason?.message);
  }
  if (websiteSettled.status === "rejected") {
    console.warn("Website scan failed:", websiteSettled.reason?.message);
  }

  // Company verification (uses Grok AI result + regex extraction)
  const companyName = extractCompanyName(content);
  const companyVerification = verifyCompany(
    content,
    companyName,
    aiResult.companyVerification || null
  );

  // Learn new patterns from AI response (fire-and-forget)
  if (aiAvailable && aiResult.reasons.length > 0) {
    learnFromAiResponse(content, aiResult.reasons).catch(err =>
      console.error("Pattern learning failed:", err.message)
    );
  }

  // Calculate enhanced risk score
  let result;
  if (aiAvailable) {
    result = calculateEnhancedRisk(
      keywordResult, patternResult, aiResult,
      websiteResult, companyVerification, emailResult
    );
  } else {
    // Fallback: keyword-only scoring
    console.warn("Grok API analysis unavailable, using keyword-only analysis");
    const kwScore = Math.min(keywordResult.score, 100);
    const finalScore = Math.min(Math.max(kwScore, 0), 95);
    result = {
      riskScore: finalScore,
      status: finalScore >= 70 ? "High Risk" : finalScore >= 40 ? "Medium Risk" : "Low Risk",
      reasons: keywordResult.reasons || [],
    };
  }

  // Attach metadata
  result.aiAvailable = aiAvailable;
  if (aiResult.summary) result.summary = aiResult.summary;
  if (patternResult.matchedPatterns?.length) result.patternMatches = patternResult.matchedPatterns;
  if (websiteResult) result.websiteSafety = websiteResult;
  if (companyVerification) result.companyVerification = companyVerification;
  if (emailResult) result.emailVerification = emailResult;

  // Ensure we always return valid results
  return {
    riskScore: result.riskScore || 0,
    status: result.status || "Unknown",
    reasons: result.reasons || [],
    aiAvailable: result.aiAvailable || false,
    summary: result.summary || "",
    websiteSafety: result.websiteSafety,
    companyVerification: result.companyVerification,
    emailVerification: result.emailVerification
  };
}

module.exports = { analyzeInternship, fetchTextFromUrl };
