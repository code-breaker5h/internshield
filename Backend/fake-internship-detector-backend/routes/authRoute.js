// Authentication Routes
const express = require("express");
const passport = require("passport");
const {
  googleCallback,
  getMe,
  logout,
  getHistory,
  saveAnalysis,
  getCredits,
  useCredit,
  getReferralCode,
  applyReferralCode,
  getReferralStats,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @route   GET /auth/google
 * @desc    Initiate Google OAuth flow
 * @access  Public
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @route   GET /auth/google/callback
 * @desc    Google OAuth callback URL
 * @access  Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, // We're using JWT, not sessions
  }),
  googleCallback
);

/**
 * @route   GET /auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get("/me", protect, getMe);

/**
 * @route   GET /auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.get("/logout", protect, logout);

/**
 * @route   GET /auth/history
 * @desc    Get user's analysis history
 * @access  Private
 */
router.get("/history", protect, getHistory);

/**
 * @route   POST /auth/save-analysis
 * @desc    Save analysis to user's history
 * @access  Private
 */
router.post("/save-analysis", protect, saveAnalysis);

/**
 * @route   GET /auth/credits
 * @desc    Get user's credits
 * @access  Private
 */
router.get("/credits", protect, getCredits);

/**
 * @route   POST /auth/use-credit
 * @desc    Use one credit for analysis
 * @access  Private
 */
router.post("/use-credit", protect, useCredit);

/**
 * @route   GET /auth/referral-code
 * @desc    Get user's referral code
 * @access  Private
 */
router.get("/referral-code", protect, getReferralCode);

/**
 * @route   POST /auth/apply-referral
 * @desc    Apply referral code
 * @access  Private
 */
router.post("/apply-referral", protect, applyReferralCode);

/**
 * @route   GET /auth/referral-stats
 * @desc    Get referral statistics
 * @access  Private
 */
router.get("/referral-stats", protect, getReferralStats);

module.exports = router;
