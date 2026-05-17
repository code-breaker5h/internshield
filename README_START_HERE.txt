╔══════════════════════════════════════════════════════════════════════╗
║                  WEBSITE NOT OPENING? START HERE!                    ║
╚══════════════════════════════════════════════════════════════════════╝

PROBLEM: Website not opening
REASON: Servers are not running

╔══════════════════════════════════════════════════════════════════════╗
║                    SOLUTION (30 SECONDS)                             ║
╚══════════════════════════════════════════════════════════════════════╝

👉 DOUBLE-CLICK THIS FILE: QUICK_START.bat

That's it! The script will:
  ✓ Install all dependencies
  ✓ Start backend server (port 3001)
  ✓ Start frontend server (port 3000)
  ✓ Open in 2 separate windows

Wait 15 seconds, then visit: http://localhost:3000


╔══════════════════════════════════════════════════════════════════════╗
║                    WHAT YOU'LL SEE                                   ║
╚══════════════════════════════════════════════════════════════════════╝

✓ Two command windows will open (don't close them!)
✓ Backend: "Server running on http://localhost:3001"
✓ Frontend: "Ready on http://localhost:3000"
✓ Website opens in browser


╔══════════════════════════════════════════════════════════════════════╗
║                    IMPORTANT NOTES                                   ║
╚══════════════════════════════════════════════════════════════════════╝

⚠️  Keep both terminal windows open
    Closing them will stop the servers

⚠️  Login won't work yet
    You need to configure Google OAuth first
    See: GOOGLE_OAUTH_SETUP.md

⚠️  First time setup takes 2-3 minutes
    Installing dependencies (npm install)


╔══════════════════════════════════════════════════════════════════════╗
║                    ALTERNATIVE METHOD                                ║
╚══════════════════════════════════════════════════════════════════════╝

If QUICK_START.bat doesn't work, manually run:

Terminal 1 (Backend):
  cd Backend\fake-internship-detector-backend
  npm install
  npm start

Terminal 2 (Frontend):
  cd Frontend
  npm install
  npm run dev


╔══════════════════════════════════════════════════════════════════════╗
║                    TROUBLESHOOTING                                   ║
╚══════════════════════════════════════════════════════════════════════╝

"npm: command not found"
  → Install Node.js from https://nodejs.org/

"Port already in use"
  → Another program is using port 3000 or 3001
  → Close other applications or change ports

"Module not found"
  → Run: npm install
  → In both Backend and Frontend folders

Website opens but login fails
  → Normal! Google OAuth not configured yet
  → See: GOOGLE_OAUTH_SETUP.md


╔══════════════════════════════════════════════════════════════════════╗
║                    FILES TO HELP YOU                                 ║
╚══════════════════════════════════════════════════════════════════════╝

🚀 QUICK_START.bat              - Start everything automatically
📖 START_WEBSITE_NOW.md         - Detailed instructions
🔐 GOOGLE_OAUTH_SETUP.md        - Fix login (after website opens)
📋 CHECKLIST.md                 - Complete setup checklist
🔧 COMPLETE_SETUP_GUIDE.md      - Full guide


╔══════════════════════════════════════════════════════════════════════╗
║                    QUICK SUMMARY                                     ║
╚══════════════════════════════════════════════════════════════════════╝

1. Run QUICK_START.bat          ← DO THIS NOW
2. Wait 15 seconds
3. Visit http://localhost:3000
4. Website opens! ✓
5. Configure Google OAuth later (for login)

TIME: 2-3 minutes for first setup
