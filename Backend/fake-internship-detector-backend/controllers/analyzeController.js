const { analyzeInternship } = require("../services/scamAnalyzer");
const { reportScamAndLearn } = require("../services/patternLearner");

async function analyze(req, res) {
  try {
    const { text, url } = req.body;

    if (!text && !url) {
      return res.status(400).json({
        error: "Request must include either 'text' or 'url' field",
      });
    }

    if (url && !/^https?:\/\/.+/i.test(url)) {
      return res.status(400).json({
        error: "Invalid URL format. Must start with http:// or https://",
      });
    }

    console.log(`Analyzing content... URL: ${url ? 'yes' : 'no'}, Text length: ${text ? text.length : 0}`);
    const result = await analyzeInternship({ text, url });

    console.log(`Analysis complete. Risk Score: ${result.riskScore}, AI Available: ${result.aiAvailable}`);

    // Ensure response is valid JSON
    if (!result || typeof result !== 'object') {
      console.error('Invalid result object:', result);
      return res.status(500).json({
        riskScore: 0,
        status: 'Error',
        reasons: ['Analysis returned invalid format'],
        aiAvailable: false
      });
    }

    return res.json(result);
  } catch (err) {
    console.error("Analysis error:", err.message);
    console.error("Error stack:", err.stack);

    // Return proper error status
    return res.status(500).json({
      success: false,
      riskScore: 0,
      status: 'Analysis Error',
      reasons: [err.message || 'Analysis service encountered an error'],
      aiAvailable: false,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Analysis failed'
    });
  }
}

async function reportScam(req, res) {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: "Report must include a 'text' field with the scam posting content",
      });
    }

    const newPatterns = await reportScamAndLearn(text);

    return res.json({
      success: true,
      message: "Scam reported successfully. Thank you for helping protect others.",
      patternsLearned: newPatterns.length,
    });
  } catch (err) {
    console.error("Report scam error:", err.message);
    return res.status(500).json({
      error: "Failed to process scam report",
    });
  }
}

module.exports = { analyze, reportScam };
