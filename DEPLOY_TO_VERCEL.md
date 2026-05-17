# 🚀 Deploy to Vercel - Quick Start

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## Manual Deploy (5 Minutes)

### Step 1: Prepare Your Code

```bash
# Make sure you're in the project root
cd /path/to/fake-internship-detector

# Install frontend dependencies
cd Frontend
npm install

# Test locally
npm run dev
# Visit http://localhost:3000 and test the analyze feature
```

### Step 2: Push to GitHub

```bash
# From project root
git init
git add .
git commit -m "Ready for Vercel deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `Frontend`
   - **Framework**: Next.js (auto-detected)
5. Add Environment Variable:
   - **Name**: `GROK_API_KEY`
   - **Value**: Your Grok API key
6. Click "Deploy"

### Step 4: Done! 🎉

Your app will be live at: `https://your-project.vercel.app`

## What's Different from Local?

### Before (Local Development):
- Separate backend server on port 5000
- Frontend on port 3000
- Need to run both servers
- CORS configuration needed

### After (Vercel):
- Everything in one Next.js app
- Backend logic in `/pages/api/` (serverless functions)
- No separate server needed
- No CORS issues
- Auto-scaling
- Free SSL

## File Changes Made for Vercel

### New Files:
- `Frontend/pages/api/analyze-internship.js` - Serverless function with all backend logic
- `Frontend/.env.production` - Production environment config
- `vercel.json` - Vercel configuration
- `.gitignore` - Prevents committing sensitive files

### Modified Files:
- `Frontend/package.json` - Added axios dependency
- `Frontend/pages/api/analyze.js` - Now redirects to serverless function

### No Changes Needed:
- All frontend pages work as-is
- All components work as-is
- All styling works as-is

## Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `GROK_API_KEY` | Your Grok API key | Yes |

## Testing Before Deploy

```bash
cd Frontend

# Install dependencies
npm install

# Build for production
npm run build

# If build succeeds, you're ready to deploy!
# If build fails, fix errors first
```

## After Deployment

### Test Your Live App:
1. Visit your Vercel URL
2. Go to "Analyze" page
3. Try demo examples
4. Upload a screenshot
5. Check results page

### Monitor Your App:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Functions → View Logs
- **Deployments**: Vercel Dashboard → Deployments

## Automatic Updates

Every git push triggers a new deployment:

```bash
# Make changes
git add .
git commit -m "Updated feature"
git push

# Vercel automatically deploys!
```

## Troubleshooting

### Build Fails
```bash
# Test build locally first
cd Frontend
npm run build

# Fix any errors, then push again
```

### API Not Working
1. Check Vercel Dashboard → Functions → Logs
2. Verify `GROK_API_KEY` is set
3. Check if Grok API has credits

### App Works Locally But Not on Vercel
1. Check environment variables are set
2. Check build logs for errors
3. Verify all dependencies in package.json

## Rollback

If something breaks:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find last working deployment
4. Click "..." → "Promote to Production"

## Cost

**FREE** for:
- Unlimited deployments
- Unlimited bandwidth (100GB/month)
- Custom domains
- SSL certificates
- Global CDN

## Support

- Full guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Vercel Docs: https://vercel.com/docs
- Issues: Create GitHub issue

## Quick Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Frontend
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

## Success! 🎉

Your Fake Internship Detector is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Auto-scaling
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Zero maintenance

Share your app and help people avoid scam internships!
