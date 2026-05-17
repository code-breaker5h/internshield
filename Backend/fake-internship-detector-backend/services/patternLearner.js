const ScamPattern = require('../models/ScamPattern');
const { Op } = require('sequelize');

// In-memory cache to avoid hitting SQLite on every request
let cachedPatterns = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getActivePatterns() {
  if (cachedPatterns && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedPatterns;
  }
  try {
    cachedPatterns = await ScamPattern.findAll({ where: { isActive: true } });
    cacheTimestamp = Date.now();
    return cachedPatterns;
  } catch {
    return cachedPatterns || [];
  }
}

function invalidateCache() {
  cachedPatterns = null;
  cacheTimestamp = 0;
}

/**
 * Scan text against all active learned patterns.
 */
async function scanPatterns(text) {
  const patterns = await getActivePatterns();
  const lower = text.toLowerCase();
  const matched = [];
  let score = 0;
  const matchedIds = [];

  for (const pattern of patterns) {
    if (lower.includes(pattern.phrase.toLowerCase())) {
      score += pattern.riskWeight;
      matched.push({
        phrase: pattern.phrase,
        category: pattern.category,
        weight: pattern.riskWeight,
      });
      matchedIds.push(pattern.id);
    }
  }

  // Increment match counts (fire-and-forget)
  if (matchedIds.length > 0) {
    ScamPattern.increment('matchCount', { where: { id: matchedIds } }).catch(() => {});
  }

  const reasons = matched.map(m => {
    const categoryLabel = {
      payment_request: 'Payment/fee scam pattern',
      urgency: 'Urgency tactic pattern',
      unrealistic_salary: 'Unrealistic promise pattern',
      suspicious_contact: 'Suspicious contact pattern',
      vague_details: 'Vague details pattern',
      pressure_tactic: 'Pressure tactic pattern',
      other: 'Known scam pattern',
    };
    return `${categoryLabel[m.category] || 'Scam pattern'} detected: "${m.phrase}"`;
  });

  return {
    score: Math.min(score, 100),
    reasons: [...new Set(reasons)],
    matchedPatterns: matched,
  };
}

/**
 * Auto-extract new patterns from AI analysis reasons.
 */
async function learnFromAiResponse(text, aiReasons) {
  if (!aiReasons || aiReasons.length === 0) return [];
  const patterns = await getActivePatterns();
  const existingPhrases = new Set(patterns.map(p => p.phrase.toLowerCase()));
  const lower = text.toLowerCase();
  const newPatterns = [];

  const categoryKeywords = {
    payment_request: ['fee', 'pay', 'cost', 'charge', 'deposit', 'money', 'price', 'amount', 'payment'],
    urgency: ['urgent', 'hurry', 'fast', 'quick', 'immediately', 'deadline', 'asap'],
    pressure_tactic: ['limited', 'only', 'last', 'expire', 'miss', 'chance', 'offer'],
    unrealistic_salary: ['guaranteed', 'lakhs', 'earn', 'salary', 'income', 'profit'],
    suspicious_contact: ['whatsapp', 'telegram', 'dm', 'gmail', 'yahoo', 'personal'],
    vague_details: ['no experience', 'no interview', 'anyone can', 'easy'],
  };

  function inferCategory(phrase) {
    const lp = phrase.toLowerCase();
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(kw => lp.includes(kw))) return cat;
    }
    return 'other';
  }

  for (const reason of aiReasons) {
    // Try to find 2-4 word phrases from the reason that appear in the original text
    const words = reason.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);

    for (let len = 4; len >= 2; len--) {
      for (let i = 0; i <= words.length - len; i++) {
        const candidate = words.slice(i, i + len).join(' ');
        if (candidate.length < 6) continue;
        if (existingPhrases.has(candidate)) continue;
        if (!lower.includes(candidate)) continue;

        // Avoid generic phrases
        const genericWords = ['the', 'and', 'for', 'this', 'that', 'with', 'are', 'was', 'has', 'been'];
        if (genericWords.some(g => candidate.startsWith(g + ' '))) continue;

        newPatterns.push({
          phrase: candidate,
          riskWeight: 5,
          category: inferCategory(candidate),
          source: 'ai_detected',
          matchCount: 1,
          isActive: true,
        });
        existingPhrases.add(candidate);
        break; // Only one pattern per reason
      }
      if (newPatterns.length > 5) break; // Max 5 new patterns per analysis
    }
  }

  if (newPatterns.length > 0) {
    try {
      await ScamPattern.bulkCreate(newPatterns);
      invalidateCache();
    } catch (err) {
      console.error('Failed to save learned patterns:', err.message);
    }
  }

  return newPatterns;
}

/**
 * Report a scam posting and extract patterns.
 */
async function reportScamAndLearn(text) {
  const patterns = await getActivePatterns();
  const existingPhrases = new Set(patterns.map(p => p.phrase.toLowerCase()));
  const lower = text.toLowerCase();
  const newPatterns = [];

  // Extract notable 2-4 word phrases that appear suspicious
  const words = lower.replace(/[^a-z0-9\s₹]/g, '').split(/\s+/).filter(w => w.length > 2);
  const stopWords = new Set(['the', 'and', 'for', 'this', 'that', 'with', 'are', 'was', 'has', 'been', 'you', 'your', 'our', 'will', 'can', 'not', 'from', 'have', 'but', 'all']);

  const categoryKeywords = {
    payment_request: ['fee', 'pay', 'cost', 'charge', 'deposit', 'money', 'price', 'amount', 'payment', 'transfer', 'upi'],
    urgency: ['urgent', 'hurry', 'fast', 'quick', 'immediately', 'deadline', 'asap'],
    pressure_tactic: ['limited', 'only', 'last', 'expire', 'miss', 'chance', 'offer', 'seats'],
    unrealistic_salary: ['guaranteed', 'lakhs', 'earn', 'salary', 'income', 'profit', 'crore'],
    suspicious_contact: ['whatsapp', 'telegram', 'dm', 'gmail', 'yahoo', 'personal'],
  };

  function inferCategory(phrase) {
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(kw => phrase.includes(kw))) return cat;
    }
    return 'other';
  }

  for (let len = 3; len >= 2; len--) {
    for (let i = 0; i <= words.length - len; i++) {
      const candidate = words.slice(i, i + len).join(' ');
      if (candidate.length < 6) continue;
      if (existingPhrases.has(candidate)) continue;
      if (stopWords.has(words[i])) continue;

      const cat = inferCategory(candidate);
      if (cat === 'other') continue; // Only learn clearly categorizable phrases

      newPatterns.push({
        phrase: candidate,
        riskWeight: 8,
        category: cat,
        source: 'user_report',
        matchCount: 1,
        isActive: true,
      });
      existingPhrases.add(candidate);

      if (newPatterns.length >= 10) break;
    }
    if (newPatterns.length >= 10) break;
  }

  if (newPatterns.length > 0) {
    try {
      await ScamPattern.bulkCreate(newPatterns);
      invalidateCache();
    } catch (err) {
      console.error('Failed to save reported patterns:', err.message);
    }
  }

  return newPatterns;
}

module.exports = { scanPatterns, learnFromAiResponse, reportScamAndLearn, invalidateCache };
