// User Model for SQLite using Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database-sqlite');

/**
 * User Model
 * Stores user information from Google OAuth
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  analysisHistory: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 5, // New users get 5 credits
  },
  creditsResetAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Track when credits were last reset
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Premium users get unlimited credits
  },
  premiumExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true, // When premium subscription expires
  },
  referralCode: {
    type: DataTypes.STRING,
    unique: true, // Unique referral code for each user
    allowNull: true,
  },
  referredBy: {
    type: DataTypes.STRING,
    allowNull: true, // Who referred this user
  },
  referralCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Number of successful referrals
  },
  bonusCredits: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Extra credits earned from referrals
  },
  lastLogin: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
  tableName: 'users',
});

// Instance methods
User.prototype.addAnalysis = async function(analysisData) {
  const history = this.analysisHistory || [];
  history.push({
    ...analysisData,
    analyzedAt: new Date(),
  });
  
  // Keep only last 50 analyses
  if (history.length > 50) {
    this.analysisHistory = history.slice(-50);
  } else {
    this.analysisHistory = history;
  }
  
  return await this.save();
};

User.prototype.updateLastLogin = async function() {
  this.lastLogin = new Date();
  return await this.save();
};

// Check and refresh credits if 24 hours have passed
User.prototype.checkAndRefreshCredits = async function() {
  try {
    // Premium users have unlimited credits
    if (this.isPremium && this.premiumExpiresAt && new Date() < new Date(this.premiumExpiresAt)) {
      this.credits = 999; // Unlimited (display as ∞)
      return this.credits;
    }
    
    // Check if premium expired
    if (this.isPremium && this.premiumExpiresAt && new Date() >= new Date(this.premiumExpiresAt)) {
      this.isPremium = false;
      this.premiumExpiresAt = null;
    }
    
    const now = new Date();
    const lastReset = new Date(this.creditsResetAt || now);
    const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);
    
    // If 24 hours have passed, reset credits to 5 + bonus credits (no stacking)
    if (hoursSinceReset >= 24) {
      this.credits = 5 + (this.bonusCredits || 0);
      this.creditsResetAt = now;
      await this.save();
    }
    
    return this.credits;
  } catch (error) {
    console.error('Error in checkAndRefreshCredits:', error);
    // Return current credits or default
    return this.credits || 5;
  }
};

// Use one credit
User.prototype.useCredit = async function() {
  // Premium users don't consume credits
  if (this.isPremium && this.premiumExpiresAt && new Date() < new Date(this.premiumExpiresAt)) {
    return await this.save();
  }
  
  if (this.credits <= 0) {
    throw new Error('No credits remaining');
  }
  
  this.credits -= 1;
  return await this.save();
};

// Generate unique referral code
User.prototype.generateReferralCode = async function() {
  if (this.referralCode) return this.referralCode;
  
  const code = `IS${this.id}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  this.referralCode = code;
  
  try {
    await this.save();
    return code;
  } catch (error) {
    console.error('Error generating referral code:', error);
    return null;
  }
};

// Add bonus credits from referral
User.prototype.addReferralBonus = async function() {
  this.referralCount += 1;
  this.bonusCredits += 2; // 2 bonus credits per referral
  this.credits += 2; // Add immediately
  await this.save();
  return this.bonusCredits;
};

module.exports = User;
