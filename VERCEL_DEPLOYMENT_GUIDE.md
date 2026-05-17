# Vercel Deployment Guide - Fake Internship Detector

## 🚀 Quick Deploy (5 Minutes)

Vercel is FREE and much simpler than VPS! No server management needed.

## Prerequisites

- GitHub account
- Vercel account (free) - sign up at https://vercel.com
- Your Grok API key

## Step 1: Push Code to GitHub (2 minutes)

### If you don't have a GitHub repo yet:

```bash
# Initialize git (if not already done)
cd /path/to/your/project
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Fake Internship Detector"

# Create a new repository on GitHub (https://github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If you already have a GitHub repo:

```bash
# Just push your latest changes
git add .
git commit -m "Prepared for Vercel deployment"
git push
```

## Step 2: Deploy to Vercel (3 minutes)

### Method 1: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: **Frontend**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Name: `GROK_API_KEY`
   - Value: Your actual Grok API key
   - Click "Add"

7. **Click "Deploy"**

That's it! Vercel will build and deploy your app in 2-3 minutes.

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from Frontend directory
cd Frontend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? fake-internship-detector
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add GROK_API_KEY
# Paste your Grok API key when prompted
# Select: Production, Preview, Development (all)

# Deploy to production
vercel --prod
```

## Step 3: Your App is Live! 🎉

After deployment, you'll get a URL like:
```
https://fake-internship-detector.vercel.app
```

Or with your custom domain:
```
https://yourdomain.com
```

## Environment Variables Setup

In Vercel Dashboard:
1. Go to your project
2. Click "Settings"
3. Click "Environment Variables"
4. Add:
   - **Name**: `GROK_API_KEY`
   - **Value**: Your Grok API key
   - **Environments**: Production, Preview, Development

## Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain
4. Update DNS records as instructed by Vercel
5. SSL is automatic and free!

## Automatic Deployments

Every time you push to GitHub:
- **main branch** → Deploys to production automatically
- **other branches** → Creates preview deployments

```bash
# Make changes
git add .
git commit -m "Updated features"
git push

# Vercel automatically deploys! ✨
```

## Project Structure for Vercel

```
Frontend/
├── pages/
│   ├── api/
│   │   ├── analyze.js              # Main API endpoint
│   │   └── analyze-internship.js   # Serverless function with all logic
│   ├── index.js                     # Homepage
│   ├── analyze.js                   # Analyze page
│   ├── results.js                   # Results page
│   └── ...
├── components/
├── styles/
├── package.json
└── vercel.json                      # Vercel configuration
```

## What Changed for Vercel?

1. ✅ **Backend moved to serverless functions** - No separate backend server needed
2. ✅ **All logic in `/pages/api/`** - Vercel automatically handles these as serverless functions
3. ✅ **No CORS issues** - Frontend and API on same domain
4. ✅ **Auto-scaling** - Handles any traffic automatically
5. ✅ **Free SSL** - HTTPS enabled by default
6. ✅ **Global CDN** - Fast worldwide

## Testing Locally Before Deploy

```bash
cd Frontend

# Install dependencies (including axios)
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

Test the analyze feature to make sure everything works!

## Troubleshooting

### Build fails on Vercel

**Check build logs** in Vercel dashboard:
- Look for missing dependencies
- Check for syntax errors
- Verify environment variables are set

**Common fixes:**
```bash
# Locally test the build
cd Frontend
npm run build

# If it fails locally, fix errors first
```

### API returns 500 error

**Check Function Logs** in Vercel:
1. Go to your project
2. Click "Functions"
3. Click on `/api/analyze`
4. View logs

**Common issues:**
- Missing `GROK_API_KEY` environment variable
- Grok API key invalid or no credits
- Timeout (Vercel free tier: 10s limit)

### Grok API not working

The app will still work with keyword-only analysis if Grok fails:
- Risk scores based on keyword detection
- Still provides accurate results
- No AI summary, but all other features work

## Vercel Free Tier Limits

- ✅ **Bandwidth**: 100GB/month
- ✅ **Serverless Function Execution**: 100GB-hours
- ✅ **Builds**: 6000 minutes/month
- ✅ **Deployments**: Unlimited
- ✅ **Custom Domains**: Unlimited
- ✅ **SSL**: Free
- ⚠️ **Function Timeout**: 10 seconds (enough for our app)

This is MORE than enough for your internship detector!

## Monitoring Your App

### View Analytics
1. Go to Vercel Dashboard
2. Click your project
3. Click "Analytics"
4. See visitors, page views, performance

### View Logs
1. Go to Vercel Dashboard
2. Click your project
3. Click "Functions"
4. Click on a function to see logs

### View Deployments
1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. See all deployments and their status

## Update Your App

```bash
# Make changes to your code
# Commit and push
git add .
git commit -m "Added new feature"
git push

# Vercel automatically deploys!
# Check deployment status in Vercel dashboard
```

## Rollback to Previous Version

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find the working deployment
4. Click "..." → "Promote to Production"

## Performance Optimization

Vercel automatically optimizes:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Caching
- ✅ Compression
- ✅ Global CDN

No configuration needed!

## Cost

**FREE** for:
- Personal projects
- Hobby projects
- Small commercial projects

**Paid plans** ($20/month) only if you need:
- Team collaboration
- More bandwidth
- Longer function timeouts
- Priority support

## Comparison: Vercel vs VPS

| Feature | Vercel (Free) | VPS ($6/month) |
|---------|---------------|----------------|
| Setup Time | 5 minutes | 1-2 hours |
| Maintenance | Zero | Regular updates |
| Scaling | Automatic | Manual |
| SSL | Free, automatic | Manual setup |
| CDN | Global, included | Extra cost |
| Monitoring | Built-in | Setup required |
| Backups | Automatic | Manual |
| Cost | FREE | $6/month |

## Next Steps After Deployment

1. ✅ Test all features on production URL
2. ✅ Share your app with friends
3. ✅ Add custom domain (optional)
4. ✅ Monitor analytics
5. ✅ Keep improving features

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Discord**: https://vercel.com/discord
- **Status Page**: https://vercel-status.com

## Common Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# Link local project to Vercel
vercel link

# Pull environment variables
vercel env pull
```

## Security Best Practices

1. ✅ **Never commit API keys** - Use environment variables
2. ✅ **Use .gitignore** - Exclude .env files
3. ✅ **Rotate keys regularly** - Update in Vercel dashboard
4. ✅ **Monitor usage** - Check Vercel analytics
5. ✅ **Enable Vercel Authentication** - For sensitive projects

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] `GROK_API_KEY` environment variable added
- [ ] Deployment successful
- [ ] App accessible via Vercel URL
- [ ] All features tested and working
- [ ] Custom domain added (optional)

## You're Done! 🎉

Your Fake Internship Detector is now live on Vercel with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless backend
- ✅ Auto-scaling
- ✅ Zero maintenance
- ✅ FREE hosting

Share your app and help people avoid scam internships!
