const axios = require("axios");

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

/**
 * Sanitize user input to reduce prompt injection risk.
 * Strips common injection patterns while preserving legitimate text.
 */
function sanitizeInput(text) {
  let cleaned = text;
  // Remove attempts to override system instructions
  cleaned = cleaned.replace(/ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi, '[filtered]');
  cleaned = cleaned.replace(/you\s+are\s+(now|actually)\s+/gi, '[filtered]');
  cleaned = cleaned.replace(/system\s*:\s*/gi, '[filtered]');
  cleaned = cleaned.replace(/\bact\s+as\s+(a|an)\s+/gi, '[filtered]');
  cleaned = cleaned.replace(/respond\s+with\s+.*riskScore\s*:\s*0/gi, '[filtered]');
  cleaned = cleaned.replace(/return\s+.*"riskScore"\s*:\s*0/gi, '[filtered]');
  // Limit length to prevent token abuse
  return cleaned.slice(0, 5000);
}

/**
 * Send internship text to Grok API and return structured scam analysis.
 */
async function analyzeWithGrok(text) {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey || apiKey === "your_grok_api_key" || apiKey.includes("placeholder")) {
    throw new Error("GROK_API_KEY is not configured");
  }

  // Sanitize user input before sending to AI
  const sanitizedText = sanitizeInput(text);

  const systemPrompt = `You are a scam detection expert specializing in fake internship postings. When given an internship description, analyze it for scam indicators and return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "riskScore": <number 0-100>,
  "reasons": ["reason1", "reason2"],
  "summary": "brief summary",
  "companyVerification": {
    "companyName": "detected company name or null",
    "isVerifiable": true or false,
    "confidence": "high" or "medium" or "low",
    "details": "explanation of company verification findings",
    "flags": ["flag1", "flag2"]
  }
}

Look for these scam signals:
- Requests for payment, registration fees, or deposits
- Unrealistic promises (guaranteed placement, high salary for no experience)
- Pressure tactics (limited seats, act fast, offer expires)
- Informal communication channels (WhatsApp, Telegram, personal email)
- Vague company details or no verifiable company information
- Grammar/spelling issues typical of scam postings
- Too-good-to-be-true offers

Additionally, if a company name is mentioned, assess:
- Is this a known, verifiable company with real online presence?
- Does the company size/reputation match the opportunity described?
- Are there red flags about the company itself (generic name, no website, etc.)?`;

  try {
    const response = await axios.post(
      GROK_API_URL,
      {
        model: "grok-2-latest",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Analyze the following internship description and identify possible scam indicators such as payment requests, unrealistic promises, or suspicious wording. Return structured JSON.\n\nInternship Description:\n${sanitizedText}`,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from Grok API");
    }

    // Strip markdown code fences if present, then parse JSON
    const cleaned = content.replace(/```(?:json)?\s*/g, "").replace(/```/g, "").trim();
    
    try {
      const parsed = JSON.parse(cleaned);
      return {
        riskScore: typeof parsed.riskScore === "number" ? parsed.riskScore : 0,
        reasons: Array.isArray(parsed.reasons) ? parsed.reasons : [],
        summary: parsed.summary || "",
        companyVerification: parsed.companyVerification || null,
      };
    } catch (parseError) {
      console.error("Failed to parse Grok response as JSON:", cleaned);
      throw new Error("Invalid JSON response from Grok API");
    }
  } catch (error) {
    // Handle Axios errors (API errors, network errors, etc.)
    if (error.response) {
      // API returned an error response
      const errorMsg = error.response.data?.error || error.response.statusText;
      throw new Error(`Grok API error: ${errorMsg}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from Grok API - network error");
    } else {
      // Something else went wrong
      throw error;
    }
  }
}

module.exports = { analyzeWithGrok };
