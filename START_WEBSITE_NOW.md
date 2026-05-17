# Start Website Now - Simple Instructions

## Problem
Website not opening because servers aren't running.

## Solution (Choose One)

### Option 1: Quick Start (Recommended)
**Just double-click:** `QUICK_START.bat`

This will:
- Install all dependencies automatically
- Start both backend and frontend servers
- Open in 2 separate windows

Wait 15 seconds, then visit: **http://localhost:3000**

---

### Option 2: Manual Start

**Step 1:** Install backend dependencies
```bash
cd Backend\fake-internship-detector-backend
npm install
```

**Step 2:** Start backend (keep window open)
```bash
npm start
```

**Step 3:** Open NEW terminal, install frontend dependencies
```bash
cd Frontend
npm install
```

**Step 4:** Start frontend (keep window open)
```bash
npm run dev
```

**Step 5:** Visit http://localhost:3000

---

## What You'll See

✅ **Backend running:** http://localhost:3001
- Should show: "Fake Internship Detector API" status page

✅ **Frontend running:** http://localhost:3000
- Should show: Your website homepage

⚠️ **Login won't work yet** because Google OAuth isn't configured
- See: `GOOGLE_OAUTH_SETUP.md` to fix login

---

## Troubleshooting

### "Port already in use"
Another program is using port 3000 or 3001.

**Fix:**
```bash
# Find what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### "npm: command not found"
Node.js isn't installed.

**Fix:** Download and install from https://nodejs.org/

### "Module not found" errors
Dependencies not installed.

**Fix:** Run `npm install` in both Backend and Frontend folders

### Website loads but login doesn't work
Google OAuth credentials not configured.

**Fix:** Follow instructions in `GOOGLE_OAUTH_SETUP.md`

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start everything | Double-click `QUICK_START.bat` |
| Backend only | Run `START_BACKEND.bat` |
| Frontend only | Run `START_FRONTEND.bat` |
| Stop servers | Press Ctrl+C in terminal windows |
| Check backend | Visit http://localhost:3001 |
| Check frontend | Visit http://localhost:3000 |

---

## Current Status

- ✅ Configuration files created (.env)
- ✅ Secure secrets generated
- ⚠️ Dependencies need to be installed (run QUICK_START.bat)
- ⚠️ Servers need to be started
- ⚠️ Google OAuth needs credentials (for login to work)

---

## Next Steps After Website Opens

1. Website opens ✓
2. Configure Google OAuth → See `GOOGLE_OAUTH_SETUP.md`
3. Test login functionality
4. Start using the app!

**Estimated time to get website running:** 2-3 minutes  
**Estimated time to fix login:** 10 minutes (Google OAuth setup)
