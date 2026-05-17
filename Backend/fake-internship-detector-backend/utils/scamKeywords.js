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

  // Unrealistic promises
  { keyword: "guaranteed placement", weight: 18, reason: "Unrealistic guarantee of job" },
  { keyword: "100% placement", weight: 20, reason: "Unrealistic 100% placement guarantee" },
  { keyword: "guaranteed job", weight: 18, reason: "Unrealistic guarantee of job" },
  { keyword: "earn from day 1", weight: 15, reason: "Unrealistic earning promise" },
  { keyword: "earn while you learn", weight: 8, reason: "Potentially misleading earning claim" },
  { keyword: "no experience required", weight: 6, reason: "No-experience claim may be a red flag" },
  { keyword: "no skills needed", weight: 12, reason: "No-skills-needed claim is suspicious" },
  { keyword: "immediate joining", weight: 8, reason: "Urgency tactic detected" },

  // Pressure tactics
  { keyword: "limited seats", weight: 14, reason: "Artificial scarcity / urgency tactic" },
  { keyword: "hurry", weight: 10, reason: "Urgency pressure tactic detected" },
  { keyword: "last date", weight: 6, reason: "Deadline pressure tactic" },
  { keyword: "confirm your seat", weight: 14, reason: "Seat-confirmation pressure tactic" },
  { keyword: "apply now", weight: 4, reason: "Urgency language detected" },
  { keyword: "offer expires", weight: 14, reason: "Expiration urgency tactic" },
  { keyword: "act fast", weight: 12, reason: "High-pressure urgency tactic" },

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
];

module.exports = scamKeywords;
