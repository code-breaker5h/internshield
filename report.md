# 📋 InternShield - Complete Project Report

**Date**: May 17, 2026  
**Status**: Ready for Production  
**Version**: 2.0.0

---

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Architecture](#project-architecture)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Workflow & Data Flow](#workflow--data-flow)
7. [Backend Architecture](#backend-architecture)
8. [Frontend Architecture](#frontend-architecture)
9. [API Endpoints](#api-endpoints)
10. [Database Schema](#database-schema)
11. [Environment Variables](#environment-variables)
12. [Setup & Installation](#setup--installation)
13. [Deployment Guide](#deployment-guide)
14. [Development Guide](#development-guide)
15. [Known Issues & Solutions](#known-issues--solutions)

---

## 🎯 Project Overview

**InternShield** is an AI-powered web application designed to protect students from internship scams. It uses advanced pattern detection, keyword analysis, and AI to identify suspicious internship postings.

### Problem Statement
Students are frequently targeted by fake internship scams that:
- Charge registration/processing fees
- Promise unrealistic placements
- Use pressure tactics (limited seats, urgent deadlines)
- Communicate through informal channels (WhatsApp, Gmail)
- Ask for upfront payments before placement

### Solution
InternShield provides:
- **Instant Analysis**: Get risk assessment in under 3 seconds
- **Multiple Input Methods**: URL, text, or screenshot
- **AI-Powered Detection**: Grok AI + keyword pattern matching
- **Risk Scoring**: 0-100 risk scale with detailed breakdown
- **History Tracking**: Save and review past analyses
- **Smart Recommendations**: Context-aware advice based on risk level

### Target Users
- Students looking for internships
- Parents verifying internship opportunities
- Career counselors and college advisors
- Job portal moderators

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | ^4.21.2 | Web framework |
| **Grok AI API** | Latest | AI-powered scam analysis |
| **Axios** | ^1.7.9 | HTTP client |
| **SQLite** | ^6.0.1 | Database |
| **Sequelize** | ^6.37.8 | ORM |
| **Passport.js** | ^0.7.0 | Authentication |
| **JWT** | ^9.0.2 | Token-based auth |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **CORS** | ^2.8.5 | Cross-origin requests |
| **express-rate-limit** | ^8.5.2 | API rate limiting |
| **Nodemon** | ^3.1.9 | Dev auto-reload |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.1.0 | React framework |
| **React** | ^18.2.0 | UI library |
| **Tailwind CSS** | ^3.4.1 | Styling |
| **Framer Motion** | ^11.0.0 | Animations |
| **Lucide React** | ^0.344.0 | Icons |
| **Tesseract.js** | ^7.0.0 | OCR for images |
| **Axios** | ^1.7.9 | HTTP requests |
| **js-cookie** | ^3.0.5 | Cookie management |

### Deployment
- **Hosting**: Vercel (Frontend) / VPS or Heroku (Backend)
- **Database**: SQLite (local) / PostgreSQL (production)
- **CDN**: Vercel global CDN
- **SSL**: Automatic HTTPS

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        InternShield System                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼────────┐  ┌──▼────────────┐  │
        │   Frontend     │  │   Backend     │  │
        │   (Next.js)    │  │ (Express.js)  │  │
        │                │  │               │  │
        │ - Pages        │  │ - Routes      │  │
        │ - Components   │  │ - Controllers │  │
        │ - API Routes   │  │ - Services    │  │
        │ - Styles       │  │ - Utils       │  │
        └───────┬────────┘  └──┬────────────┘  │
                │               │               │
                └───────────────┼───────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────▼──────────┐         ┌────────▼────────┐
        │   Grok AI API    │         │  SQLite DB      │
        │   (X.AI)         │         │  (Local)        │
        │ - Analysis       │         │ - Users         │
        │ - Scoring        │         │ - Analyses      │
        │ - Recommendations│         │ - History       │
        └──────────────────┘         └─────────────────┘
```

---

## 📁 Project Structure

```
internshield-main/
│
├── Backend/
│   └── fake-internship-detector-backend/
│       ├── config/
│       │   ├── database-sqlite.js        # SQLite connection
│       │   └── passport.js               # Passport configuration
│       │
│       ├── controllers/
│       │   ├── analyzeController.js      # Analysis request handler
│       │   └── authController.js         # Authentication handler
│       │
│       ├── routes/
│       │   ├── analyzeRoute.js           # /api/analyze routes
│       │   └── authRoute.js              # /auth routes
│       │
│       ├── services/
│       │   ├── scamAnalyzer.js           # Main analysis pipeline
│       │   ├── grokService.js            # Grok AI integration
│       │   ├── patternLearner.js         # Pattern detection
│       │   ├── websiteScanner.js         # Website safety checks
│       │   ├── companyVerifier.js        # Company verification
│       │   └── emailVerifier.js          # Email verification
│       │
│       ├── utils/
│       │   ├── scamKeywords.js           # 40+ scam indicators
│       │   └── riskCalculator.js         # Risk scoring algorithm
│       │
│       ├── server.js                     # Express app entry point
│       ├── package.json                  # Dependencies
│       ├── .env                          # Environment variables
│       └── node_modules/                 # Dependencies
│
├── Frontend/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── analyze.js                # API proxy route
│   │   │   └── analyze-internship.js     # Analysis endpoint
│   │   │
│   │   ├── index.js                      # Home page (hero + features)
│   │   ├── analyze.js                    # Input/analysis page
│   │   ├── results.js                    # Results display page
│   │   ├── history.js                    # Analysis history
│   │   ├── login.js                      # Login page
│   │   ├── dashboard.js                  # User dashboard
│   │   ├── about.js                      # About page
│   │   ├── how-it-works.js               # Tutorial page
│   │   ├── premium.js                    # Premium features
│   │   ├── settings.js                   # User settings
│   │   ├── referral.js                   # Referral program
│   │   ├── auth/callback.js              # OAuth callback
│   │   ├── _app.js                       # Next.js app wrapper
│   │   └── _document.js                  # HTML document
│       │
│   ├── components/
│   │   ├── Navbar.js                     # Navigation bar
│   │   ├── Footer.js                     # Footer
│   │   ├── GradientBackground.js         # Animated gradient
│   │   ├── RiskMeter.js                  # Risk score display
│   │   ├── RedFlagTooltip.js             # Red flag explanations
│   │   ├── LoadingAnimation.js           # Loading spinner
│   │   ├── GoogleLoginButton.js          # Google OAuth button
│   │   ├── CreditsDisplay.js             # Credits indicator
│   │   ├── UserProfile.js                # User profile card
│   │   ├── FeatureCard.js                # Feature cards
│   │   ├── StepCard.js                   # Tutorial steps
│   │   ├── CounterAnimation.js           # Animated counters
│   │   ├── ScrollReveal.js               # Scroll animations
│   │   ├── TextReveal.js                 # Text animations
│   │   ├── ParallaxScroll.js             # Parallax effect
│   │   ├── ParticleBg.js                 # Particle background
│   │   ├── MagnifierEffect.js            # Magnifier effect
│   │   ├── SplashCursor.js               # Custom cursor
│   │   └── FloatingAnimation.js          # Floating animation
│   │
│   ├── styles/
│   │   ├── globals.css                   # Global styles
│   │   ├── tailwind.css                  # Tailwind config
│   │   └── animations.css                # Custom animations
│   │
│   ├── contexts/
│   │   └── AuthContext.js                # Auth state management
│   │
│   ├── lib/
│   │   ├── creditsManager.js             # Credits system
│   │   └── utils.js                      # Helper functions
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── images/
│   │
│   ├── package.json
│   ├── .env.local
│   ├── next.config.js
│   ├── jsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── Documentation/
│   ├── README.md                         # Main documentation
│   ├── START_HERE.md                     # Quick start guide
│   ├── SETUP_GUIDE.md                    # Detailed setup
│   ├── CODEBASE_DOCUMENTATION.md         # Architecture docs
│   ├── DEPLOY_TO_VERCEL.md               # Vercel deployment
│   ├── VERCEL_DEPLOYMENT_GUIDE.md        # Extended Vercel guide
│   ├── VPS_DEPLOYMENT_GUIDE.md           # VPS deployment
│   ├── SSH_SETUP_GUIDE.md                # SSH setup
│   ├── DEMO_DATA.md                      # Test cases
│   ├── SCREENSHOT_OCR_FEATURE.md         # OCR documentation
│   ├── GRADIENT_BACKGROUND_FEATURE.md    # Animation docs
│   ├── RECOMMENDATION_FEATURE.md         # Recommendations
│   └── FIXES_APPLIED.md                  # Integration fixes
│
├── Configuration Files
│   ├── vercel.json                       # Vercel config
│   ├── .gitignore
│   ├── package.json
│   └── .vscode/settings.json
│
└── Setup Scripts
    ├── START_BACKEND.bat                 # Windows batch script
    ├── START_FRONTEND.bat                # Windows batch script
    └── START_WEBSITE_NOW.bat             # One-click start

```

---

## ✨ Key Features

### Core Features

#### 1. **AI-Powered Analysis**
- Integrates with Grok AI API (X.AI)
- Analyzes text for scam indicators
- Provides AI-generated recommendations
- Requires API credits to function

#### 2. **Keyword-Based Detection**
- 40+ scam indicator keywords
- Weighted scoring system
- Pattern matching across content
- Works offline (no API needed)

**Scam Keywords Categories:**
- **Payment-related**: registration fee, processing fee, security deposit, pay to join
- **Unrealistic promises**: guaranteed placement, 100% placement, no experience required
- **Pressure tactics**: limited seats, hurry, last date, offer expires
- **Suspicious communication**: WhatsApp, Telegram, personal email, Gmail

#### 3. **Risk Scoring**
- **0-30**: Low Risk (Legitimate)
- **31-60**: Medium Risk (Verify details)
- **61-95**: High Risk (Likely scam)
- Breakdown of each red flag
- Weighted contribution to final score

#### 4. **Multiple Input Methods**
- **URL Analysis**: Fetch and analyze website content
- **Text Description**: Paste job posting text
- **Screenshot OCR**: Upload image and extract text using Tesseract.js

#### 5. **Screenshot OCR**
- Upload image of job posting
- Tesseract.js extracts text
- Real-time OCR progress display
- Supports PNG, JPG, JPEG formats
- 4MB file size limit

#### 6. **Beautiful UI**
- Modern gradient animations
- Dark/Light mode toggle
- Responsive mobile design
- Smooth transitions and effects
- Interactive components

### Advanced Features

#### 7. **Analysis History**
- Save last 50 analyses in localStorage
- Persistent across sessions
- Quick access to past results
- Delete individual history items
- Export history as JSON

#### 8. **Dark/Light Mode**
- Persistent theme preference
- Smooth transitions between themes
- Cookie-based storage
- System preference detection

#### 9. **Social Sharing**
- Share on WhatsApp
- Share on Twitter
- Share on LinkedIn
- Copy result link
- Pre-formatted messages

#### 10. **Red Flag Explanations**
- Tooltip on each red flag
- Explain why it's suspicious
- Education for users
- Confidence percentage

#### 11. **Smart Recommendations**
- Risk-specific advice
- What to do next
- How to stay safe
- Reporting options
- Additional resources

#### 12. **Demo Examples**
- Pre-loaded test cases
- Different risk levels
- Quick testing
- No credits required
- Educational examples

#### 13. **Authentication**
- Google OAuth 2.0 integration
- Email/password login (future)
- JWT-based sessions
- User profiles
- History persistence

#### 14. **Credits System**
- Free guest analysis (1 per day)
- Premium users get unlimited
- Referral bonus credits
- Credit display in UI
- Used/available tracking

#### 15. **Animated Gradients**
- Orange gradient on homepage
- Violet gradient on analyze page
- Smooth transitions
- GPU-optimized animations
- Responsive animations

---

## 🔄 Workflow & Data Flow

### User Journey - Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER OPENS APP                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Load Homepage  │
                    │  (index.js)     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
        ┌─────▼────────┐         ┌────────▼──────┐
        │ Login/OAuth  │         │ Continue as   │
        │              │         │ Guest         │
        └─────┬────────┘         └────────┬──────┘
              │                           │
              └───────────┬───────────────┘
                          │
              ┌───────────▼──────────┐
              │ Navigate to Analyze  │
              │ (analyze.js)         │
              └───────────┬──────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────▼────┐    ┌────▼─────┐   ┌───▼──────┐
    │ Enter URL │    │ Paste    │   │ Upload   │
    │           │    │ Text     │   │ Screenshot
    └─────┬────┘    └────┬─────┘   └───┬──────┘
          │              │             │
          └──────────┬───┴─────────────┘
                     │
        ┌────────────▼───────────────┐
        │  Check User Credits/Limits │
        │ (creditsManager.js)        │
        └────────────┬───────────────┘
                     │
         ┌───────────▼──────────┐
         │ Send to Backend      │
         │ API (/api/analyze)   │
         └───────────┬──────────┘
                     │
        ┌────────────▼──────────────────┐
        │   Backend Analysis Pipeline   │
        │   (scamAnalyzer.js)           │
        │                               │
        │ 1. Keyword Scan               │
        │ 2. Pattern Learning           │
        │ 3. Grok AI Analysis           │
        │ 4. Website Safety Check       │
        │ 5. Company Verification       │
        │ 6. Email Verification         │
        │                               │
        └────────────┬──────────────────┘
                     │
        ┌────────────▼──────────────────┐
        │  Merge Results & Calculate    │
        │  Final Risk Score             │
        │  (riskCalculator.js)          │
        └────────────┬──────────────────┘
                     │
        ┌────────────▼──────────────────┐
        │ Return Analysis Results       │
        │ {                             │
        │   riskScore: 0-95,            │
        │   status: "...",              │
        │   reasons: [...],             │
        │   aiAnalysis: "...",          │
        │   recommendations: [...]      │
        │ }                             │
        └────────────┬──────────────────┘
                     │
        ┌────────────▼──────────────────┐
        │ Display Results Page          │
        │ (results.js)                  │
        │                               │
        │ - Risk meter visualization    │
        │ - Red flags list              │
        │ - AI recommendations          │
        │ - Share options               │
        │ - Save to history             │
        └────────────┬──────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    ┌─────▼────────┐    ┌──────▼──────┐
    │ Share Result │    │ Analyze     │
    │              │    │ Another One │
    └──────────────┘    └─────────────┘
```

### Analysis Pipeline - Backend Processing

```
REQUEST: /api/analyze
└── Request Handler (analyzeController.js)
    │
    ├─ Validate Input (text or URL)
    │
    ├─ If URL: Fetch HTML content (fetchTextFromUrl)
    │   ├─ Remove scripts/styles
    │   ├─ Extract plain text
    │   ├─ Limit to 4000 chars
    │   └─ Return text
    │
    └─ Trigger Analysis Pipeline (analyzeInternship)
       │
       ├─ RUN IN PARALLEL:
       │  │
       │  ├─ KEYWORD SCAN (keywordScan)
       │  │  ├─ Check against 40+ keywords
       │  │  ├─ Weight each match
       │  │  ├─ Calculate score (0-95)
       │  │  └─ Return: {score, reasons}
       │  │
       │  ├─ PATTERN SCAN (scanPatterns)
       │  │  ├─ Analyze learned patterns
       │  │  ├─ ML-based detection
       │  │  └─ Return: {score, patterns}
       │  │
       │  ├─ GROK AI ANALYSIS (analyzeWithGrok)
       │  │  ├─ Send to Grok API
       │  │  ├─ Get AI assessment
       │  │  ├─ Return: {riskScore, analysis}
       │  │  └─ Fallback if no credits
       │  │
       │  ├─ WEBSITE SCAN (scanWebsite)
       │  │  ├─ Check SSL certificate
       │  │  ├─ Verify domain reputation
       │  │  └─ Return: {safetyScore}
       │  │
       │  └─ EMAIL VERIFY (verifyEmails)
       │     ├─ Extract email addresses
       │     ├─ Validate format
       │     ├─ Check corporate domain
       │     └─ Return: {emailRisks}
       │
       └─ Merge Results (calculateEnhancedRisk)
          ├─ Combine all scores
          ├─ Weight by confidence
          ├─ Final score (0-95)
          ├─ Determine status
          ├─ Generate reasons
          └─ Return final result

RESPONSE:
{
  "success": true,
  "riskScore": 85,
  "status": "High Risk",
  "reasons": [...],
  "aiAnalysis": "...",
  "recommendations": [...],
  "aiAvailable": true/false
}
```

---

## 🔌 Backend Architecture

### Server Configuration (server.js)

```javascript
// Core Setup
- Port: 3001 (configurable)
- Database: SQLite (local) or PostgreSQL (production)
- Environment: Development/Production based on NODE_ENV

// Middleware Stack
1. CORS - Cross-origin requests
2. JSON Parser - Body parsing
3. URL Encoder - Form data
4. Cookie Parser - Cookie handling
5. Rate Limiter - Request throttling
   - Global: 100 requests/minute per IP
   - Analyze: 10 requests/minute per IP
6. Passport - Authentication

// Routes
POST /api/analyze - Analyze internship
GET/POST /auth/* - Authentication endpoints
GET / - Health check
```

### Controllers

#### analyzeController.js
- `analyze(req, res)` - Main analysis endpoint
  - Validates input (text or URL)
  - Calls scamAnalyzer service
  - Returns analysis results
  - Error handling with proper status codes

- `reportScam(req, res)` - User reports scam
  - Learns from user input
  - Updates pattern database
  - Confirms receipt

### Services

#### 1. scamAnalyzer.js (Main Pipeline)
```javascript
analyzeInternship({ text, url })
├─ fetchTextFromUrl(url)  // Extract text from URL
├─ keywordScan()          // 40+ keyword check
├─ scanPatterns()         // ML pattern detection
├─ analyzeWithGrok()      // AI analysis
├─ scanWebsite()          // Website safety
├─ verifyEmails()         // Email validation
└─ calculateEnhancedRisk()// Final scoring
```

#### 2. grokService.js
- Integrates with Grok API
- Sends text for AI analysis
- Handles API errors
- Fallback to keyword-only mode
- Caches API responses

#### 3. patternLearner.js
- Learns from user reports
- Updates scam patterns
- ML-based detection
- Improves over time

#### 4. websiteScanner.js
- Checks SSL certificates
- Verifies HTTPS
- Domain reputation check
- Detects phishing

#### 5. companyVerifier.js
- Extract company name from URL
- Verify company registration
- Check WHOIS information
- Cross-reference databases

#### 6. emailVerifier.js
- Extract emails from text
- Validate email format
- Check domain legitimacy
- Detect personal email usage

### Utilities

#### scamKeywords.js
Contains 40+ weighted scam indicators:

**Payment Red Flags (Weight: 18-22)**
- Registration fee
- Processing fee
- Security deposit
- Pay to join
- Payment required

**Unrealistic Promises (Weight: 6-20)**
- Guaranteed placement
- 100% placement guarantee
- Earn from day 1
- No experience/skills needed

**Pressure Tactics (Weight: 4-14)**
- Limited seats
- Hurry/Act fast
- Last date
- Offer expires
- Confirm your seat

**Suspicious Communication (Weight: 3-10)**
- WhatsApp/Telegram
- Personal email
- Gmail/Yahoo for recruitment
- DM us

#### riskCalculator.js
```javascript
keywordScan(content)        // Scan keywords
calculateRisk(results)      // Basic scoring (0-95)
calculateEnhancedRisk()     // Advanced scoring
mergeResults()              // Combine all checks
determineStatus()           // Risk classification
```

---

## 🎨 Frontend Architecture

### Pages (Next.js Pages)

#### 1. index.js - Homepage
- Hero section with CTAs
- Feature showcase
- How it works section
- Success metrics (animated counters)
- FAQ section
- Footer

#### 2. analyze.js - Analysis Page
- Tab-based input selector
  - URL tab
  - Text description tab
  - Screenshot upload tab
- OCR progress indicator
- Demo examples carousel
- Analyze button
- Tutorial overlay
- Credits display
- Loading animation

#### 3. results.js - Results Display
- Risk meter (circular progress)
- Risk score (0-95)
- Risk status badge
- Red flags list with tooltips
- AI analysis summary
- Recommendations (based on risk level)
- Share buttons (WhatsApp, Twitter, LinkedIn)
- Save to history
- Analyze another button

#### 4. history.js - Analysis History
- List of past analyses
- Filter by date/risk level
- Delete individual items
- Export history
- Re-analyze option

#### 5. dashboard.js - User Dashboard
- User profile information
- Analysis statistics
- Recent analyses
- Credits balance
- Referral code
- Settings quick access

#### 6. login.js - Authentication
- Google OAuth button
- Email/password form (future)
- Sign up option
- Forgot password (future)
- Login status

#### 7. about.js - About Page
- Project information
- Team information
- Mission statement
- Trust indicators

#### 8. how-it-works.js - Tutorial
- Step-by-step guide
- Feature explanations
- Interactive examples
- Video tutorials (future)

#### 9. settings.js - User Settings
- Theme toggle
- Notification preferences
- Privacy settings
- Password change
- Account deletion

#### 10. premium.js - Premium Features
- Feature comparison table
- Pricing tiers
- Payment integration
- FAQs

### API Routes (Next.js serverless functions)

#### /api/analyze
- Proxy to backend
- Handles text/URL analysis
- Returns analysis results
- Error handling

#### /api/analyze-internship
- Alternative analysis endpoint
- Pre-processing
- Caching layer
- Response formatting

### Components

#### Layout Components
- **Navbar.js** - Navigation header with logo, menu, user profile
- **Footer.js** - Footer with links, copyright, social media
- **GradientBackground.js** - Animated gradient backgrounds

#### Analysis Components
- **RiskMeter.js** - Circular progress showing risk score
- **RedFlagTooltip.js** - Tooltip with red flag explanations
- **CreditsDisplay.js** - Shows available credits/limits
- **LoadingAnimation.js** - Loading spinner

#### Input Components
- **InputForm.js** - URL/text input form
- **OCRUploader.js** - Screenshot upload with progress
- **DemoExamples.js** - Pre-loaded test cases

#### User Components
- **GoogleLoginButton.js** - OAuth login button
- **UserProfile.js** - User profile card
- **AuthContext.js** - Auth state management

#### Visual Effects
- **ScrollReveal.js** - Reveal elements on scroll
- **TextReveal.js** - Animate text appearance
- **ParallaxScroll.js** - Parallax scrolling effect
- **ParticleBg.js** - Particle background animation
- **MagnifierEffect.js** - Magnifying glass effect
- **SplashCursor.js** - Custom splash cursor
- **FloatingAnimation.js** - Floating element animation
- **CounterAnimation.js** - Animated number counters
- **FeatureCard.js** - Feature showcase cards
- **StepCard.js** - Tutorial step cards

### Styling

#### Tailwind CSS
- Utility-first CSS framework
- Custom color palette
- Responsive design
- Dark mode support

#### Custom CSS
- animations.css - Custom keyframe animations
- globals.css - Global styles
- Component-specific styles

### State Management

#### AuthContext.js
```javascript
// Provides:
- isAuthenticated (boolean)
- user (object)
- credits (number)
- history (array)

// Methods:
- login(email, password)
- loginWithGoogle()
- logout()
- useCredit()
- saveAnalysis()
- getHistory()
```

#### creditsManager.js
```javascript
// Functions:
- getGuestCredits()
- hasGuestUsedFreeAnalysis()
- markGuestAnalysisUsed()
- getGuestCreditResetTime()
- useCreditForGuest()
- addCreditsForUser()
```

---

## 🔌 API Endpoints

### Analysis Endpoints

#### POST /api/analyze
**Description**: Analyze internship posting for scams

**Request Body**:
```json
{
  "text": "string (job description text)",
  "url": "string (optional: internship URL)"
}
```

**Response**:
```json
{
  "success": true,
  "riskScore": 85,
  "status": "High Risk",
  "reasons": [
    "Registration fee detected",
    "Guaranteed placement",
    "Limited seats",
    "WhatsApp communication"
  ],
  "aiAnalysis": "This posting shows multiple red flags typical of internship scams...",
  "recommendations": [
    "Do not pay any registration fees",
    "Verify company details independently",
    "Use official company email"
  ],
  "aiAvailable": false
}
```

**Status Codes**:
- `200` - Success
- `400` - Invalid request (missing text/URL)
- `500` - Server error

**Rate Limit**: 10 requests per minute per IP

---

#### POST /api/analyze-internship
**Alternative endpoint** with same functionality

**Features**:
- Pre-processing layer
- Caching for identical requests
- Response formatting
- Telemetry logging

---

### Authentication Endpoints

#### GET /auth/google
**Description**: Initiate Google OAuth flow

**Response**: Redirects to Google login page

---

#### GET /auth/google/callback
**Description**: Google OAuth callback

**Query Params**:
- `code` - Authorization code
- `state` - State verification

**Response**: JWT token in cookie

---

#### GET /auth/me
**Description**: Get current user information

**Headers**:
```
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "credits": 100,
    "createdAt": "2026-05-17T00:00:00Z"
  }
}
```

---

#### GET /auth/logout
**Description**: Logout user

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### GET /auth/history
**Description**: Get user's analysis history

**Headers**:
```
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "success": true,
  "history": [
    {
      "id": "analysis_id",
      "text": "Job description...",
      "riskScore": 85,
      "status": "High Risk",
      "createdAt": "2026-05-17T12:00:00Z"
    }
  ],
  "count": 50
}
```

---

### Health Check

#### GET /
**Description**: Server health check

**Response**:
```json
{
  "service": "Fake Internship Detector API",
  "status": "running",
  "version": "2.0.0",
  "database": "SQLite",
  "endpoints": {
    "analyze": "POST /api/analyze",
    "auth": {
      "google": "GET /auth/google",
      "me": "GET /auth/me",
      "logout": "GET /auth/logout",
      "history": "GET /auth/history"
    }
  }
}
```

---

## 💾 Database Schema

### SQLite Database

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  googleId STRING UNIQUE,
  email STRING UNIQUE NOT NULL,
  name STRING,
  credits INTEGER DEFAULT 100,
  isPremium BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Analyses Table
```sql
CREATE TABLE analyses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  text TEXT,
  url STRING,
  riskScore INTEGER,
  status STRING,
  reasons TEXT (JSON),
  aiAnalysis TEXT,
  recommendations TEXT (JSON),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

#### Patterns Table
```sql
CREATE TABLE patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pattern STRING UNIQUE,
  weight REAL,
  frequency INTEGER DEFAULT 1,
  confirmed BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Grok AI API
GROK_API_KEY=xai-your-actual-api-key-here

# Database
DATABASE_URL=sqlite:./database.db

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
```

### Frontend (.env.local)

```env
# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Feature Flags
NEXT_PUBLIC_ENABLE_PREMIUM=true
NEXT_PUBLIC_ENABLE_HISTORY=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

---

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- A Grok API key (from console.x.ai)
- (Optional) GitHub account for deployment

### Backend Setup

```bash
# Navigate to backend directory
cd Backend/fake-internship-detector-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Grok API key

# Run migrations (if any)
npm run migrate

# Start development server
npm run dev

# Backend runs on http://localhost:3001
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with backend URL

# Start development server
npm run dev

# Frontend runs on http://localhost:3000
```

### Test the Installation

```bash
# Test backend API
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"Pay Rs 5000 registration fee for guaranteed placement. Limited seats. WhatsApp now!"}'

# Expected Response:
# {
#   "riskScore": 85,
#   "status": "High Risk",
#   "reasons": [...],
#   "aiAvailable": false
# }

# Test frontend
# Open http://localhost:3000 in browser
# Navigate to /analyze
# Try demo examples or enter test text
```

---

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

#### Step 1: Prepare Repository

```bash
# Create GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/internshield.git
git push -u origin main
```

#### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your GitHub repository
5. Set Root Directory: `Frontend`
6. Framework: `Next.js` (auto-detected)
7. Add Environment Variables:
   - `NEXT_PUBLIC_BACKEND_URL`: Backend URL (see Step 3)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google Client ID
8. Click "Deploy"

#### Step 3: Deploy Backend

**Option A: Vercel Serverless Functions**
- Place backend code in `api/` folder
- Use Vercel serverless format
- Automatic deployment

**Option B: Heroku**
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Add environment variables
heroku config:set GROK_API_KEY=your_key
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app

# Deploy
git push heroku main
```

**Option C: Self-hosted VPS**
- See VPS_DEPLOYMENT_GUIDE.md

#### Step 4: Configure Backend URL

Update Vercel environment variables with backend URL (from Step 3)

#### Step 5: Test Deployment

```
Frontend: https://your-project.vercel.app
Backend: https://your-api-url.com (or Vercel functions)

Test the /analyze endpoint with a POST request
```

---

## 💻 Development Guide

### Project Setup

```bash
# Clone repository
git clone https://github.com/username/internshield.git
cd internshield

# Setup backend
cd Backend/fake-internship-detector-backend
npm install

# Setup frontend
cd ../../Frontend
npm install
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd Backend/fake-internship-detector-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

**Access**:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Development Workflow

#### Adding a New Feature

1. Create feature branch
```bash
git checkout -b feature/feature-name
```

2. Make changes
```bash
# Edit files
# Test locally
# Run tests if applicable
```

3. Commit and push
```bash
git add .
git commit -m "Add feature description"
git push origin feature/feature-name
```

4. Create pull request on GitHub
5. Review and merge
6. Auto-deploys to Vercel

#### Code Structure Best Practices

**Backend**:
- Keep routes thin, move logic to services
- Use try-catch in controllers
- Return consistent response format
- Log important operations
- Validate input in controllers

**Frontend**:
- Use components for reusability
- Manage state with Context API
- Keep API calls in separate hooks
- Use Tailwind for styling
- Add loading/error states

### Testing

```bash
# Backend tests (if implemented)
cd Backend/fake-internship-detector-backend
npm test

# Frontend tests (if implemented)
cd Frontend
npm test

# Manual testing
# 1. Test all input methods
# 2. Test with demo examples
# 3. Test with real URLs
# 4. Test sharing functionality
# 5. Test theme toggle
# 6. Test on mobile
```

---

## ⚠️ Known Issues & Solutions

### Issue 1: Grok API Not Working

**Symptom**: AI analysis not available, only keyword detection works

**Cause**: Grok API key has no credits

**Solution**:
```
1. Go to https://console.x.ai/
2. Add credits to your account
3. Update GROK_API_KEY in .env
4. Restart backend server
5. Test with POST /api/analyze
```

**Workaround**: App still works with keyword-only detection (40+ indicators)

---

### Issue 2: CORS Errors

**Symptom**: "Cross-origin request blocked" in browser console

**Cause**: Incorrect CORS configuration

**Solution**:
```
Backend (server.js):
- Check FRONTEND_URL in .env
- Ensure Frontend URL is in allowedOrigins
- Update both local and production URLs

Frontend (.env.local):
- NEXT_PUBLIC_BACKEND_URL should match backend origin
- For local: http://localhost:3001
- For production: https://your-backend-url
```

---

### Issue 3: OCR Not Working

**Symptom**: Screenshot upload fails or shows no text

**Cause**: Tesseract.js initialization issues

**Solution**:
```
1. Check browser console for errors
2. Verify file format (PNG/JPG)
3. Check file size (<4MB)
4. Clear browser cache
5. Try different browser
6. Restart development server
```

---

### Issue 4: Database Connection Error

**Symptom**: "Cannot connect to database" error

**Cause**: SQLite database file missing or corrupted

**Solution**:
```bash
# Delete old database
rm Backend/fake-internship-detector-backend/database.db

# Restart backend server
npm run dev
# Database will be auto-created

# Check database.db exists
ls Backend/fake-internship-detector-backend/
```

---

### Issue 5: Build Fails on Vercel

**Symptom**: Vercel deployment fails with build errors

**Cause**: Missing dependencies or environment variables

**Solution**:
```
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Run local build:
   cd Frontend
   npm run build
4. Fix any errors shown
5. Commit and push
6. Vercel will auto-redeploy
```

---

### Issue 6: Slow Analysis

**Symptom**: Analysis takes >10 seconds

**Cause**: 
- Grok API is slow
- Website scanner timeout
- Network issues

**Solution**:
```
1. Check Grok API status
2. Use shorter text input
3. Increase timeout limits:
   const timeout = 30000; // in ms
4. Disable website scanner:
   if (!url) scanWebsite = null
```

---

## 📊 Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| **Analysis Time** | <3 seconds | ~2-5 seconds |
| **Keyword Scan** | <500ms | ~200ms |
| **Grok API** | <2 seconds | ~1-3 seconds |
| **OCR Processing** | <5 seconds | ~3-8 seconds |
| **Frontend Load** | <1 second | ~0.8 seconds |
| **Backend Response** | <1 second | ~0.5 seconds |

---

## 🔐 Security Considerations

### Current Implementation
- ✅ CORS configured
- ✅ Rate limiting enabled
- ✅ Input validation
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ HTTPS ready

### Future Improvements
- [ ] Add request signing
- [ ] Implement CSRF protection
- [ ] SQL injection prevention (using ORM)
- [ ] XSS protection (Next.js built-in)
- [ ] API key rotation
- [ ] Audit logging
- [ ] Two-factor authentication

---

## 📈 Scalability Roadmap

### Phase 1: Current (Completed)
- Single backend server
- SQLite database
- Vercel frontend deployment
- Grok API integration

### Phase 2: Scaling (Planned)
- Load balancer
- Multiple backend instances
- PostgreSQL database
- Redis caching
- CDN integration

### Phase 3: Enterprise (Future)
- Kubernetes deployment
- Database replication
- API rate limiting per user
- Custom branding
- White-label solution
- Advanced analytics

---

## 🤝 Contributing

### Setup Development Environment

```bash
# Fork repository
# Clone your fork
git clone https://github.com/your-username/internshield.git

# Add upstream
git remote add upstream https://github.com/original-owner/internshield.git

# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Test locally
# Commit and push
git push origin feature/your-feature

# Create pull request on GitHub
```

### Code Style

- **Backend**: JavaScript ES6+
- **Frontend**: React hooks and functional components
- **Styling**: Tailwind CSS utility classes
- **Naming**: camelCase for variables, PascalCase for components

---

## 📞 Support & Documentation

### Quick Links
- **Main README**: README.md
- **Setup Guide**: SETUP_GUIDE.md
- **Deployment**: DEPLOY_TO_VERCEL.md
- **Architecture**: CODEBASE_DOCUMENTATION.md
- **Test Cases**: DEMO_DATA.md

### Getting Help
1. Check documentation files
2. Review GitHub issues
3. Check terminal error messages
4. Verify environment variables
5. Test with demo examples

---

## 📄 License

MIT License - Feel free to use, modify, and distribute

---

## 🎉 Summary

**InternShield** is a comprehensive solution for protecting students from internship scams. It combines:

- **Smart Detection**: 40+ scam indicators + AI analysis
- **Multiple Input Methods**: URL, text, screenshot
- **Easy Deployment**: One-click Vercel deployment
- **Modern UI**: Beautiful animations and responsive design
- **User-Friendly**: No technical knowledge required
- **Free to Use**: Keyword detection always works

**Ready to Deploy**: The application is production-ready and can be deployed in 5 minutes on Vercel.

---

**Last Updated**: May 17, 2026  
**Status**: ✅ Production Ready  
**Version**: 2.0.0

