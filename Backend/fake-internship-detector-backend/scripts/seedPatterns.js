const ScamPattern = require('../models/ScamPattern');
const { sequelize } = require('../config/database-sqlite');
const scamKeywords = require('../utils/scamKeywords');

async function seedPatterns() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const existing = await ScamPattern.count();
    if (existing > 0) {
      console.log(`⚠️  Database already has ${existing} patterns. Skipping seed.`);
      return;
    }

    const categoryMap = {
      'fee': 'payment_request',
      'pay': 'payment_request',
      'deposit': 'payment_request',
      'payment': 'payment_request',
      'bank transfer': 'payment_request',
      'upi': 'payment_request',
      '₹': 'payment_request',
      'guaranteed': 'unrealistic_salary',
      '100%': 'unrealistic_salary',
      'earn': 'unrealistic_salary',
      'no experience': 'unrealistic_salary',
      'no skills': 'unrealistic_salary',
      'limited': 'pressure_tactic',
      'hurry': 'pressure_tactic',
      'last date': 'pressure_tactic',
      'confirm your seat': 'pressure_tactic',
      'apply now': 'pressure_tactic',
      'offer expires': 'pressure_tactic',
      'act fast': 'pressure_tactic',
      'immediate': 'pressure_tactic',
      'whatsapp': 'suspicious_contact',
      'telegram': 'suspicious_contact',
      'dm us': 'suspicious_contact',
      'personal email': 'suspicious_contact',
      'gmail.com': 'suspicious_contact',
      'yahoo.com': 'suspicious_contact',
      'work from home': 'vague_details',
      'certificate': 'other',
      'stipend': 'payment_request',
      'training period unpaid': 'payment_request',
    };

    function getCategory(keyword) {
      for (const [key, cat] of Object.entries(categoryMap)) {
        if (keyword.includes(key)) return cat;
      }
      return 'other';
    }

    const patterns = scamKeywords.map(kw => ({
      phrase: kw.keyword.toLowerCase(),
      riskWeight: kw.weight,
      category: getCategory(kw.keyword.toLowerCase()),
      source: 'manual',
      matchCount: 0,
      isActive: true,
    }));

    // Add extra learned patterns
    const extraPatterns = [
      { phrase: 'send money', riskWeight: 20, category: 'payment_request' },
      { phrase: 'pay before joining', riskWeight: 22, category: 'payment_request' },
      { phrase: 'deposit required', riskWeight: 18, category: 'payment_request' },
      { phrase: 'advance payment', riskWeight: 20, category: 'payment_request' },
      { phrase: 'only few spots left', riskWeight: 12, category: 'pressure_tactic' },
      { phrase: 'last chance', riskWeight: 10, category: 'pressure_tactic' },
      { phrase: 'offer valid till', riskWeight: 10, category: 'pressure_tactic' },
      { phrase: 'salary in lakhs', riskWeight: 14, category: 'unrealistic_salary' },
      { phrase: 'earn lakhs', riskWeight: 16, category: 'unrealistic_salary' },
      { phrase: 'no interview required', riskWeight: 14, category: 'vague_details' },
      { phrase: 'selected candidate', riskWeight: 10, category: 'pressure_tactic' },
      { phrase: 'congratulations you have been selected', riskWeight: 14, category: 'pressure_tactic' },
      { phrase: 'contact on whatsapp', riskWeight: 12, category: 'suspicious_contact' },
      { phrase: 'message us on telegram', riskWeight: 12, category: 'suspicious_contact' },
      { phrase: 'hotmail.com', riskWeight: 6, category: 'suspicious_contact' },
      { phrase: 'outlook.com', riskWeight: 4, category: 'suspicious_contact' },
    ].map(p => ({ ...p, source: 'manual', matchCount: 0, isActive: true }));

    await ScamPattern.bulkCreate([...patterns, ...extraPatterns]);
    console.log(`✅ Seeded ${patterns.length + extraPatterns.length} scam patterns`);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  } finally {
    await sequelize.close();
  }
}

seedPatterns();
