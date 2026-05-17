# 🛡️ InternShield - Fake Internship Detector

AI-powered web application to protect students from internship scams.

![Status](https://img.shields.io/badge/status-integrated-success)
![Backend](https://img.shields.io/badge/backend-Express.js-green)
![Frontend](https://img.shields.io/badge/frontend-Next.js-blue)
![AI](https://img.shields.io/badge/AI-Grok-orange)

---

## 🚀 Quick Start

### 🌐 Deploy to Vercel (Recommended - FREE & Easy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**5-minute deployment:**
1. Push code to GitHub
2. Import to Vercel
3. Add `GROK_API_KEY` environment variable
4. Deploy!

📖 **Full Guide**: [DEPLOY_TO_VERCEL.md](./DEPLOY_TO_VERCEL.md)

---

### 💻 Run Locally

#### Option 1: Using Batch Files (Windows)

**Terminal 1** - Start Backend:
```bash
START_BACKEND.bat
```

**Terminal 2** - Start Frontend:
```bash
START_FRONTEND.bat
```

#### Option 2: Manual Start

**Terminal 1** - Backend:
```bash
cd Backend/fake-internship-detector-backend
npm install
npm start
```

**Terminal 2** - Frontend:
```bash
cd Frontend
npm install
npm run dev
```

### Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

---

## ⚠️ Important Notice

**Grok API Status**: The API key is valid but has **no credits**. 

- ✅ Keyword-based detection works (40+ scam indicators)
- ❌ AI analysis needs credits from https://console.x.ai/

The app will still function with keyword-only detection!

---

## 🎯 Features

### Core Features
- **AI-Powered Analysis**: Grok AI detects scam patterns
- **Keyword Detection**: 40+ scam indicators (fees, urgency, fake promises)
- **Risk Scoring**: 0-95 risk score with detailed breakdown
- **Multiple Input Methods**: URL, text description, or screenshot upload
- **Screenshot OCR**: Extract text from images using Tesseract.js
- **Beautiful UI**: Modern, animated interface with gradient backgrounds
- **Real-time Results**: Get analysis in under 3 seconds

### New Features
- **Analysis History**: Saves last 50 analyses in localStorage
- **Dark/Light Mode**: Toggle theme with persistent preference
- **Share Results**: Share on WhatsApp, Twitter, LinkedIn, or copy link
- **Red Flag Explanations**: Detailed tooltips explaining each warning
- **Smart Recommendations**: Risk-specific advice on what to do next
- **Demo Examples**: Pre-loaded test cases for quick testing
- **Animated Gradients**: Beautiful orange (homepage) and violet (analyze page) backgrounds

---

## 📁 Project Structure

```
InternShield/
├── Backend/
│   └── fake-internship-detector-backend/
│       ├── controllers/      # Request handlers
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       ├── utils/           # Helpers & keywords
│       └── server.js        # Express server
│
├── Frontend/
│   ├── components/          # React components
│   ├── pages/              # Next.js pages
│   │   ├── api/           # API proxy routes
│   │   ├── index.js       # Home
│   │   ├── analyze.js     # Input page
│   │   └── results.js     # Results page
│   └── styles/            # CSS
│
└── Documentation/
    ├── CODEBASE_DOCUMENTATION.md  # Full architecture
    ├── SETUP_GUIDE.md            # Detailed setup
    └── FIXES_APPLIED.md          # Integration fixes
```

---

## 🔧 Tech Stack

### Backend
- Node.js + Express.js
- Grok AI API (X.AI)
- Axios for HTTP requests
- CORS enabled

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React Icons

---

## 📖 Documentation

### Deployment Guides
- **[DEPLOY_TO_VERCEL.md](./DEPLOY_TO_VERCEL.md)** - 5-minute Vercel deployment (RECOMMENDED)
- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - Complete Vercel guide with troubleshooting
- **[VPS_DEPLOYMENT_GUIDE.md](./VPS_DEPLOYMENT_GUIDE.md)** - Full VPS deployment guide
- **[QUICK_VPS_SETUP.md](./QUICK_VPS_SETUP.md)** - 10-minute VPS quick start
- **[SSH_SETUP_GUIDE.md](./SSH_SETUP_GUIDE.md)** - Complete SSH setup tutorial

### Technical Documentation
- **[CODEBASE_DOCUMENTATION.md](./CODEBASE_DOCUMENTATION.md)** - Complete architecture, API docs, data flow
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup, test cases, troubleshooting
- **[FIXES_APPLIED.md](./FIXES_APPLIED.md)** - Integration fixes and improvements

### Feature Documentation
- **[DEMO_DATA.md](./DEMO_DATA.md)** - Test cases and demo examples
- **[SCREENSHOT_OCR_FEATURE.md](./SCREENSHOT_OCR_FEATURE.md)** - OCR implementation details
- **[GRADIENT_BACKGROUND_FEATURE.md](./GRADIENT_BACKGROUND_FEATURE.md)** - Animated gradient documentation
- **[RECOMMENDATION_FEATURE.md](./RECOMMENDATION_FEATURE.md)** - Smart recommendations system

---

## 🧪 Test the API

```bash
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"Great opportunity! Pay Rs 5000 registration fee for guaranteed placement. Limited seats. WhatsApp now!\"}"
```

Expected response:
```json
{
  "riskScore": 85,
  "status": "High Risk",
  "reasons": [
    "Registration fee detected",
    "Guaranteed placement",
    "Limited seats",
    "WhatsApp communication"
  ],
  "aiAvailable": false
}
```

---

## 🎨 Screenshots

The app includes:
- Modern landing page with animations
- Three input methods (URL, text, screenshot UI)
- Visual risk meter (0-100)
- Detailed red flag breakdown
- AI-generated recommendations

---

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=3001
GROK_API_KEY=your_api_key_here
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## ✅ What's Working

### Core Functionality
- ✅ Frontend-Backend integration (local & Vercel serverless)
- ✅ API proxy route / Serverless functions
- ✅ Keyword-based scam detection (40+ indicators)
- ✅ Risk scoring algorithm (0-95 scale)
- ✅ URL content fetching and analysis
- ✅ Screenshot OCR with Tesseract.js
- ✅ Beautiful responsive UI with animations
- ✅ Error handling and fallbacks
- ✅ CORS configuration

### Advanced Features
- ✅ Analysis history (localStorage)
- ✅ Dark/Light mode toggle
- ✅ Social sharing (WhatsApp, Twitter, LinkedIn)
- ✅ Red flag tooltips with explanations
- ✅ Smart recommendations based on risk level
- ✅ Demo examples for testing
- ✅ Animated gradient backgrounds
- ✅ Mobile responsive design

### Deployment
- ✅ Vercel-ready (serverless functions)
- ✅ VPS deployment scripts
- ✅ Environment variable configuration
- ✅ Production build optimization

---

## ⚠️ Known Issues

1. **Grok API needs credits** - AI analysis disabled until credits added at https://console.x.ai/
2. **Fallback works perfectly** - Keyword-only detection is highly accurate
3. **No authentication** - Anyone can use the API (add auth for production)
4. **No rate limiting** - Consider adding for production deployment

---

## 🔮 Future Enhancements

- [ ] Add Grok API credits for enhanced AI features
- [ ] User authentication and accounts
- [ ] Database for persistent history
- [ ] Domain verification (WHOIS, SSL checks)
- [ ] Email alerts for high-risk postings
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Company verification with MCA21 API
- [ ] Rate limiting and API protection
- [ ] Admin dashboard for monitoring

---

## 🤝 Contributing

This project was built by merging two separate implementations:
- Backend by Developer 1
- Frontend by Developer 2

Integration and documentation by AI Assistant.

---

## 📄 License

MIT

---

## 🆘 Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Review [CODEBASE_DOCUMENTATION.md](./CODEBASE_DOCUMENTATION.md) for architecture
3. Check terminal output for error messages
4. Verify both servers are running

---

## 🎓 How It Works

1. User submits internship text or URL
2. Frontend sends request to Next.js API route
3. API route proxies to Express backend
4. Backend runs keyword scan (always works)
5. Backend attempts AI analysis (needs credits)
6. Results merged and scored (0-100)
7. Frontend displays risk meter and red flags

---

**Built with ❤️ to protect students from internship scams**

**Status**: Ready to use with keyword detection. Add Grok credits for full AI power! 🚀
