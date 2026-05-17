// Authentication Controller
const jwt = require("jsonwebtoken");
const User = require("../models/User-sqlite");

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

/**
 * @desc    Google OAuth callback - handle successful authentication
 * @route   GET /auth/google/callback
 * @access  Public
 */
exports.googleCallback = async (req, res) => {
  try {
    console.log('=== Google Callback Started ===');
    
    // User is attached to req by passport
    const user = req.user;

    if (!user) {
      console.error('❌ No user found in request');
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
    }

    console.log('✓ User found:', user.email);

    // Update last login
    try {
      await user.updateLastLogin();
      console.log('✓ Last login updated');
    } catch (err) {
      console.error('⚠️ Error updating last login:', err.message);
    }
    
    // Check and refresh credits if needed
    try {
      await user.checkAndRefreshCredits();
      console.log('✓ Credits checked:', user.credits);
    } catch (err) {
      console.error('⚠️ Error checking credits:', err.message);
    }
    
    // Generate referral code if doesn't exist
    try {
      if (!user.referralCode) {
        await user.generateReferralCode();
        console.log('✓ Referral code generated');
      }
    } catch (err) {
      console.error('⚠️ Error generating referral code:', err.message);
    }

    // Generate JWT token
    const token = generateToken(user.id);
    console.log('✓ JWT token generated');

    // Prepare user data
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      credits: user.credits || 5,
      creditsResetAt: user.creditsResetAt || new Date(),
      isPremium: user.isPremium || false,
      bonusCredits: user.bonusCredits || 0,
    };

    console.log('✓ User data prepared:', userData);

    // Redirect to frontend with token only (frontend will fetch user data via /auth/me)
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}`;
    console.log('✓ Redirecting to frontend');
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("❌ Google callback error:", error);
    console.error("Error stack:", error.stack);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=callback_failed`);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Check and refresh credits if needed
    await user.checkAndRefreshCredits();

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        credits: user.credits,
        creditsResetAt: user.creditsResetAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

/**
 * @desc    Logout user
 * @route   GET /auth/logout
 * @access  Private
 */
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error logging out",
      });
    }
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

/**
 * @desc    Get user's analysis history
 * @route   GET /auth/history
 * @access  Private
 */
exports.getHistory = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const history = user.analysisHistory || [];

    res.status(200).json({
      success: true,
      count: history.length,
      data: history.reverse(), // Most recent first
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: error.message,
    });
  }
};

/**
 * @desc    Save analysis to user's history
 * @route   POST /auth/save-analysis
 * @access  Private
 */
exports.saveAnalysis = async (req, res) => {
  try {
    const { text, url, riskScore, status, reasons } = req.body;

    const user = await User.findByPk(req.user.id);

    await user.addAnalysis({
      text: text || "",
      url: url || "",
      riskScore,
      status,
      reasons,
    });

    res.status(200).json({
      success: true,
      message: "Analysis saved to history",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving analysis",
      error: error.message,
    });
  }
};

/**
 * @desc    Get user's credits
 * @route   GET /auth/credits
 * @access  Private
 */
exports.getCredits = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Check and refresh credits if needed
    await user.checkAndRefreshCredits();

    res.status(200).json({
      success: true,
      data: {
        credits: user.credits,
        creditsResetAt: user.creditsResetAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching credits",
      error: error.message,
    });
  }
};

/**
 * @desc    Use one credit for analysis
 * @route   POST /auth/use-credit
 * @access  Private
 */
exports.useCredit = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Check and refresh credits if needed
    await user.checkAndRefreshCredits();
    
    // Use one credit
    await user.useCredit();

    res.status(200).json({
      success: true,
      data: {
        credits: user.credits,
        creditsResetAt: user.creditsResetAt,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get user's referral code
 * @route   GET /auth/referral-code
 * @access  Private
 */
exports.getReferralCode = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Generate referral code if doesn't exist
    const code = await user.generateReferralCode();

    res.status(200).json({
      success: true,
      data: {
        referralCode: code,
        referralCount: user.referralCount,
        bonusCredits: user.bonusCredits,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching referral code",
      error: error.message,
    });
  }
};

/**
 * @desc    Apply referral code (for new users)
 * @route   POST /auth/apply-referral
 * @access  Private
 */
exports.applyReferralCode = async (req, res) => {
  try {
    const { referralCode } = req.body;
    const user = await User.findByPk(req.user.id);
    
    // Check if user already used a referral code
    if (user.referredBy) {
      return res.status(400).json({
        success: false,
        message: "You have already used a referral code",
      });
    }
    
    // Find the referrer
    const referrer = await User.findOne({ where: { referralCode } });
    
    if (!referrer) {
      return res.status(404).json({
        success: false,
        message: "Invalid referral code",
      });
    }
    
    // Can't refer yourself
    if (referrer.id === user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot use your own referral code",
      });
    }
    
    // Apply referral
    user.referredBy = referralCode;
    user.credits += 3; // New user gets 3 bonus credits
    await user.save();
    
    // Give referrer bonus
    await referrer.addReferralBonus();

    res.status(200).json({
      success: true,
      message: "Referral code applied! You received 3 bonus credits.",
      data: {
        credits: user.credits,
        bonusCredits: 3,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error applying referral code",
      error: error.message,
    });
  }
};

/**
 * @desc    Get referral stats
 * @route   GET /auth/referral-stats
 * @access  Private
 */
exports.getReferralStats = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Count users referred by this user
    const referredUsers = await User.count({
      where: { referredBy: user.referralCode },
    });

    res.status(200).json({
      success: true,
      data: {
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        bonusCredits: user.bonusCredits,
        totalReferred: referredUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching referral stats",
      error: error.message,
    });
  }
};
