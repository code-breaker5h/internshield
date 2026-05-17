# Quick VPS Setup - 10 Minute Guide

## 1. Get a VPS (5 minutes)

### Recommended: DigitalOcean
1. Go to https://www.digitalocean.com/
2. Sign up (get $200 credit for 60 days with GitHub Student Pack)
3. Create a Droplet:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($6/month - 1GB RAM)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: SSH Key (recommended) or Password
   - **Hostname**: internship-detector

### Alternative: Vultr
1. Go to https://www.vultr.com/
2. Sign up
3. Deploy New Server:
   - **Type**: Cloud Compute
   - **Location**: Choose closest
   - **Image**: Ubuntu 22.04
   - **Plan**: $6/month (1GB RAM)

## 2. Connect to Your VPS (1 minute)

```bash
# You'll receive an IP address and password via email
ssh root@YOUR_VPS_IP

# Enter the password when prompted
```

## 3. Run Auto-Setup Script (3 minutes)

Copy and paste this entire script:

```bash
#!/bin/bash
# One-command VPS setup

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install other dependencies
apt install -y git nginx build-essential

# Install PM2
npm install -g pm2

# Setup firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create deploy user
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Setup app directory
mkdir -p /var/www
chown -R deploy:deploy /var/www

echo "✅ VPS setup complete!"
echo "Next: Switch to deploy user with: su - deploy"
```

## 4. Deploy Your Application (1 minute)

Switch to deploy user:
```bash
su - deploy
```

Clone and setup:
```bash
# Clone your repo (replace with your actual repo URL)
cd /var/www
git clone YOUR_GITHUB_REPO_URL fake-internship-detector
cd fake-internship-detector

# Setup backend
cd Backend/fake-internship-detector-backend
npm install
echo "PORT=5000" > .env
echo "GROK_API_KEY=your_key_here" >> .env
echo "NODE_ENV=production" >> .env

# Setup frontend
cd ../../Frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run build

# Start with PM2
cd /var/www/fake-internship-detector
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 5. Configure Nginx (30 seconds)

```bash
# Copy nginx config
sudo cp /var/www/fake-internship-detector/nginx.conf /etc/nginx/sites-available/fake-internship-detector

# Edit with your IP or domain
sudo nano /etc/nginx/sites-available/fake-internship-detector
# Change "yourdomain.com" to your VPS IP address

# Enable site
sudo ln -s /etc/nginx/sites-available/fake-internship-detector /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Access Your Site! 🎉

Open your browser and go to:
```
http://YOUR_VPS_IP
```

## SSH Key Setup (Optional but Recommended)

### On your local machine:

**Windows (PowerShell):**
```powershell
# Generate key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
type $env:USERPROFILE\.ssh\id_ed25519.pub | clip
```

**Mac/Linux:**
```bash
# Generate key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

### On VPS:
```bash
# As deploy user
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste your public key, save (Ctrl+X, Y, Enter)

chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Now you can connect without password:
```bash
ssh deploy@YOUR_VPS_IP
```

## Useful Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs

# Restart apps
pm2 restart all

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Update Your Application

```bash
cd /var/www/fake-internship-detector
git pull
./deploy.sh
```

## Troubleshooting

### Can't connect to VPS?
- Check if you're using the correct IP
- Verify firewall allows SSH (port 22)
- Try using password if SSH key fails

### Application not loading?
```bash
# Check if services are running
pm2 status
sudo systemctl status nginx

# Check logs
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

### Port already in use?
```bash
# Kill process on port 3000 or 5000
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:5000 | xargs kill -9

# Restart PM2
pm2 restart all
```

## Cost Breakdown

- **VPS**: $6/month (DigitalOcean/Vultr)
- **Domain** (optional): $10-15/year
- **SSL**: Free (Let's Encrypt)

**Total: $6/month** 💰

## Next Steps

1. ✅ Get a domain name (Namecheap, Google Domains)
2. ✅ Point domain to VPS IP
3. ✅ Setup SSL with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```
4. ✅ Update frontend .env.local with your domain
5. ✅ Setup automatic backups

## Free VPS Options (For Testing)

- **Oracle Cloud**: Free tier (1GB RAM)
- **Google Cloud**: $300 credit for 90 days
- **AWS**: Free tier t2.micro for 12 months
- **Azure**: $200 credit for 30 days

## Support

If you get stuck:
1. Check the full guide: `VPS_DEPLOYMENT_GUIDE.md`
2. View PM2 logs: `pm2 logs`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
