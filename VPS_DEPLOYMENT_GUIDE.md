# VPS Deployment Guide - Fake Internship Detector

## Prerequisites
- A VPS (DigitalOcean, AWS EC2, Linode, Vultr, etc.)
- Ubuntu 20.04 or 22.04 LTS recommended
- Root or sudo access
- Domain name (optional but recommended)

## Step 1: Get a VPS

### Recommended Providers:
1. **DigitalOcean** - $6/month droplet (1GB RAM, 1 vCPU)
2. **Vultr** - $6/month instance
3. **Linode** - $5/month Nanode
4. **AWS EC2** - t2.micro (free tier eligible)
5. **Hetzner** - €4.51/month CX11

### Minimum Requirements:
- 1GB RAM
- 1 vCPU
- 25GB SSD
- Ubuntu 20.04/22.04 LTS

## Step 2: Initial VPS Setup

### Connect via SSH (First Time)
```bash
# Use the IP address and root password provided by your VPS provider
ssh root@YOUR_VPS_IP
```

### Create a New User (Security Best Practice)
```bash
# Create new user
adduser deploy

# Add to sudo group
usermod -aG sudo deploy

# Switch to new user
su - deploy
```

### Setup SSH Key Authentication (Recommended)

**On your local machine:**
```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to VPS
ssh-copy-id deploy@YOUR_VPS_IP
```

**Or manually:**
```bash
# On your local machine, copy your public key
cat ~/.ssh/id_ed25519.pub

# On VPS, as deploy user
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste your public key, save and exit

chmod 600 ~/.ssh/authorized_keys
```

### Secure SSH Configuration
```bash
sudo nano /etc/ssh/sshd_config
```

Update these settings:
```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart SSH:
```bash
sudo systemctl restart sshd
```

## Step 3: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install build essentials
sudo apt install -y build-essential

# Install Git
sudo apt install -y git

# Install Nginx
sudo apt install -y nginx

# Install PM2 globally
sudo npm install -g pm2

# Verify installations
node --version
npm --version
git --version
nginx -v
pm2 --version
```

## Step 4: Setup Firewall

```bash
# Enable UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

## Step 5: Clone Your Project

```bash
# Create app directory
sudo mkdir -p /var/www
sudo chown -R deploy:deploy /var/www

# Clone your repository
cd /var/www
git clone YOUR_REPOSITORY_URL fake-internship-detector
cd fake-internship-detector
```

## Step 6: Setup Backend

```bash
cd /var/www/fake-internship-detector/Backend/fake-internship-detector-backend

# Install dependencies
npm install

# Create production .env file
nano .env
```

Add your environment variables:
```env
PORT=5000
GROK_API_KEY=your_actual_grok_api_key_here
NODE_ENV=production
```

## Step 7: Setup Frontend

```bash
cd /var/www/fake-internship-detector/Frontend

# Install dependencies
npm install

# Create production .env.local
nano .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Build the frontend:
```bash
npm run build
```

## Step 8: Setup PM2 Process Manager

```bash
# Start backend
cd /var/www/fake-internship-detector/Backend/fake-internship-detector-backend
pm2 start server.js --name "internship-backend"

# Start frontend
cd /var/www/fake-internship-detector/Frontend
pm2 start npm --name "internship-frontend" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
# Copy and run the command that PM2 outputs

# Check status
pm2 status
pm2 logs
```

## Step 9: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/fake-internship-detector
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/fake-internship-detector /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 10: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is setup automatically
# Test renewal
sudo certbot renew --dry-run
```

## Step 11: Update Frontend API URL

After SSL setup, update frontend .env.local:
```bash
nano /var/www/fake-internship-detector/Frontend/.env.local
```

Change to:
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

Rebuild and restart:
```bash
npm run build
pm2 restart internship-frontend
```

## Useful Commands

### PM2 Management
```bash
pm2 list                    # List all processes
pm2 logs                    # View logs
pm2 logs internship-backend # View specific app logs
pm2 restart all             # Restart all apps
pm2 stop all                # Stop all apps
pm2 delete all              # Delete all apps
pm2 monit                   # Monitor resources
```

### Nginx Management
```bash
sudo systemctl status nginx  # Check status
sudo systemctl restart nginx # Restart
sudo nginx -t               # Test configuration
sudo tail -f /var/log/nginx/error.log  # View error logs
```

### System Monitoring
```bash
htop                        # Interactive process viewer
df -h                       # Disk usage
free -h                     # Memory usage
```

### Update Application
```bash
cd /var/www/fake-internship-detector
git pull origin main

# Update backend
cd Backend/fake-internship-detector-backend
npm install
pm2 restart internship-backend

# Update frontend
cd ../../Frontend
npm install
npm run build
pm2 restart internship-frontend
```

## Troubleshooting

### Check if ports are in use
```bash
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5000
```

### Check PM2 logs
```bash
pm2 logs --lines 100
```

### Check Nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Restart everything
```bash
pm2 restart all
sudo systemctl restart nginx
```

## Security Checklist

- [ ] SSH key authentication enabled
- [ ] Root login disabled
- [ ] Password authentication disabled
- [ ] Firewall (UFW) enabled
- [ ] Only necessary ports open (22, 80, 443)
- [ ] SSL certificate installed
- [ ] Regular system updates scheduled
- [ ] PM2 startup script configured
- [ ] Environment variables secured
- [ ] Regular backups configured

## Cost Estimate

- VPS: $5-6/month
- Domain: $10-15/year (optional)
- SSL: Free (Let's Encrypt)

**Total: ~$6/month**

## Next Steps

1. Purchase a VPS from your preferred provider
2. Follow this guide step by step
3. Point your domain to the VPS IP address
4. Setup SSL certificate
5. Test your application

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify all services are running: `pm2 status` and `sudo systemctl status nginx`
