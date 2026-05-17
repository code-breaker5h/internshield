# 🛡️ InternShield

> AI-powered protection for students against internship scams.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview

**InternShield** is an AI-powered tool designed to help students detect fake internship postings and scam listings. Many students fall victim to fraudulent internship offers that require registration fees, collect personal data, or promise unrealistic opportunities.

InternShield analyzes internship postings and generates a **Scam Risk Score** with detailed explanations of detected red flags.

## ✨ Features

- 🤖 **AI Scam Detection** — NLP-powered analysis of job descriptions for scam patterns
- 🌐 **Domain Verification** — Checks company websites for legitimacy and domain age
- 📊 **Risk Score Analysis** — Comprehensive 0-100 risk score with severity breakdown
- 🚩 **Red Flag Detection** — Identifies payment requirements, suspicious emails, urgency tactics
- 📱 **Responsive Design** — Beautiful UI that works on all devices
- 🎨 **Futuristic UI** — Dark theme with glassmorphism, glowing gradients, and smooth animations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with Pages Router |
| **Tailwind CSS** | Utility-first CSS styling |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Beautiful icon library |
| **JavaScript** | Programming language |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/internshield.git

# Navigate to the project
cd internshield

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
internshield/
├── components/
│   ├── Navbar.js          # Navigation bar
│   ├── Footer.js          # Footer component
│   ├── FeatureCard.js     # Reusable feature card
│   ├── StepCard.js        # Process step card
│   ├── RiskMeter.js       # Visual risk score gauge
│   ├── LoadingAnimation.js # AI analysis loading screen
│   └── ParticleBg.js      # Animated particle background
├── pages/
│   ├── _app.js            # App wrapper
│   ├── _document.js       # Document head
│   ├── index.js           # Home page
│   ├── analyze.js         # Internship analyzer
│   ├── results.js         # Analysis results dashboard
│   ├── how-it-works.js    # Process explanation
│   └── about.js           # About & mission
├── styles/
│   └── globals.css        # Global styles & animations
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section, features, how it works preview |
| **Analyzer** | `/analyze` | Input form for URL, text, or screenshot |
| **Results** | `/results` | AI analysis dashboard with risk meter |
| **How It Works** | `/how-it-works` | 4-step process explanation |
| **About** | `/about` | Mission, problem statement, values |

## 🔮 Future Improvements

- [ ] **Real AI Backend** — Integrate actual NLP models for analysis
- [ ] **Database** — Store analysis history and scam reports
- [ ] **Browser Extension** — Analyze postings directly on job portals
- [ ] **Community Reports** — Allow users to report scam postings
- [ ] **API** — Public API for third-party integrations
- [ ] **Multi-language Support** — Analyze postings in multiple languages
- [ ] **Company Directory** — Database of verified legitimate companies
- [ ] **Email Alerts** — Notify users of new scam patterns

## 📝 Note

This is a **frontend prototype** built for hackathon demonstration purposes. The analysis results are simulated. A real backend with AI/ML models would be integrated in a production version.

## 📜 License

MIT License — feel free to use this project for your hackathon or portfolio.

---

**Built with ❤️ to protect students from internship scams.**
