# 📤 Upload to GitHub - Complete Guide

## Step 1: Install Git (if not working)

### Option A: Download Git for Windows
1. Go to: https://git-scm.com/download/win
2. Download and install
3. During installation, select "Git Bash Here" option
4. Restart your terminal/PowerShell

### Option B: Check if Git is installed
Open a NEW terminal and run:
```bash
git --version
```

If you see a version number, Git is installed!

---

## Step 2: Configure Git (First Time Only)

Open terminal and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

---

## Step 3: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `fake-internship-detector`
3. **Description**: `AI-powered web app to detect fake internship scams`
4. **Visibility**: Public
5. **DO NOT** check any boxes (no README, no .gitignore)
6. **Click**: "Create repository"

GitHub will show you commands - keep that page open!

---

## Step 4: Upload Your Code

### Using Git Bash (Recommended)

1. **Right-click** in your project folder (`Main`)
2. **Select**: "Git Bash Here"
3. **Run these commands** one by one:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Fake Internship Detector"

# Add remote (replace with YOUR GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/fake-internship-detector.git

# Set branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Using PowerShell (Alternative)

If Git Bash doesn't work, try PowerShell:

1. Open PowerShell in your project folder
2. Run:
```powershell
# Check if git works
git --version

# If it works, continue:
git init
git add .
git commit -m "Initial commit - Fake Internship Detector"
git remote add origin https://github.com/YOUR_USERNAME/fake-internship-detector.git
git branch -M main
git push -u origin main
```

---

## Step 5: Authentication

When pushing, GitHub will ask for credentials:

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token" → "Generate new token (classic)"
3. Name: "Vercel Deployment"
4. Expiration: 90 days (or No expiration)
5. Check: ✅ `repo` (all repo permissions)
6. Click: "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

When Git asks:
- **Username**: Your GitHub username
- **Password**: Paste the token (not your GitHub password)

### Option B: GitHub Desktop (Easiest!)

1. Download: https://desktop.github.com/
2. Install and sign in
3. Click: "Add" → "Add Existing Repository"
4. Select your `Main` folder
5. Click: "Publish repository"
6. Done! ✅

---

## Step 6: Verify Upload

1. Go to: https://github.com/YOUR_USERNAME/fake-internship-detector
2. You should see all your files!
3. README.md should be displayed

---

## 🚨 Troubleshooting

### Git not recognized in PowerShell

**Solution 1**: Use Git Bash instead
- Right-click in folder → "Git Bash Here"

**Solution 2**: Add Git to PATH
1. Find Git installation (usually `C:\Program Files\Git\cmd`)
2. Add to Windows PATH environment variable
3. Restart terminal

**Solution 3**: Use GitHub Desktop (easiest)

### Authentication failed

**Solution**: Use Personal Access Token instead of password
- Follow "Option A" in Step 5 above

### Remote already exists

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Large files warning

The `.gitignore` file should prevent this, but if you see warnings:
```bash
git rm -r --cached node_modules
git rm -r --cached Frontend/node_modules
git rm -r --cached Backend/fake-internship-detector-backend/node_modules
git commit -m "Remove node_modules"
git push
```

---

## ✅ What Gets Uploaded

Your `.gitignore` ensures:
- ✅ All source code
- ✅ Documentation files
- ✅ Configuration files
- ❌ NOT node_modules (too large)
- ❌ NOT .env files (sensitive)
- ❌ NOT build folders

---

## 🎯 After Upload

Once on GitHub:
1. ✅ Code is backed up
2. ✅ Ready for Vercel deployment
3. ✅ Can collaborate with others
4. ✅ Version control enabled

**Next**: Deploy to Vercel using `DEPLOY_TO_VERCEL.md`

---

## 📱 Quick Commands Reference

```bash
# Check git version
git --version

# Initialize repository
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Add remote
git remote add origin URL

# Push to GitHub
git push -u origin main

# Check remotes
git remote -v
```

---

## 🆘 Still Having Issues?

### Option 1: Use GitHub Desktop
- Easiest method
- No command line needed
- Download: https://desktop.github.com/

### Option 2: Use VS Code
1. Open project in VS Code
2. Click Source Control icon (left sidebar)
3. Click "Initialize Repository"
4. Click "Publish to GitHub"
5. Follow prompts

### Option 3: Manual Upload
1. Zip your project (exclude node_modules)
2. Create repo on GitHub
3. Upload files through GitHub web interface
4. Not recommended for large projects

---

## 🎉 Success!

Once uploaded, you'll have:
- GitHub repository URL
- Version control
- Ready for Vercel deployment
- Backup of your code

**Repository URL format**:
```
https://github.com/YOUR_USERNAME/fake-internship-detector
```

Save this URL - you'll need it for Vercel!

---

Last Updated: March 14, 2026
