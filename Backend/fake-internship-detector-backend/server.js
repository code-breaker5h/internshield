require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

// Import SQLite database connection
const { connectDB } = require("./config/database-sqlite");

// Import routes
const analyzeRoute = require("./routes/analyzeRoute");
const authRoute = require("./routes/authRoute");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to SQLite Database
connectDB();

// Passport configuration
require("./config/passport")(passport);

// Middleware - Restrict CORS to frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. server-to-server, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Global rate limiting (100 requests per minute per IP)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// Passport middleware (JWT only, no sessions needed)
app.use(passport.initialize());

// Rate limiting for analyze endpoint (10 requests per minute per IP)
const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many analysis requests. Please wait a minute." },
});

// Routes
app.use("/api/analyze", analyzeLimiter, analyzeRoute);
app.use("/auth", authRoute);

// Health check
app.get("/", (_req, res) => {
  res.json({
    service: "Fake Internship Detector API",
    status: "running",
    version: "2.0.0",
    database: "SQLite",
    endpoints: {
      analyze: "POST /api/analyze",
      auth: {
        google: "GET /auth/google",
        me: "GET /auth/me",
        logout: "GET /auth/logout",
        history: "GET /auth/history",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`💾 Database: SQLite`);
});
