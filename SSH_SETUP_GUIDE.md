# SSH Setup Guide - Complete Tutorial

## What is SSH?

SSH (Secure Shell) is a secure way to connect to your VPS remotely. It's like having a terminal window directly on your server.

## Step 1: Generate SSH Keys (One-time setup)

### Windows (PowerShell or Command Prompt)

```powershell
# Open PowerShell and run:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Enter a passphrase (optional but recommended)
# Press Enter twice if you don't want a passphrase

# Your keys are now at:
# Private key: C:\Users\YourUsername\.ssh\id_ed25519
# Public key: C:\Users\YourUsername\.ssh\id_ed25519.pub
```

### Mac/Linux (Terminal)

```bash
# Open Terminal and run:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Enter a passphrase (optional but recommended)

# Your keys are now at:
# Private key: ~/.ssh/id_ed25519
# Public key: ~/.ssh/id_ed25519.pub
```

## Step 2: Copy Public Key to VPS

### Method 1: Automatic (Easiest)

**Windows (PowerShell):**
```powershell
# Replace YOUR_VPS_IP with your actual IP
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@YOUR_VPS_IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**Mac/Linux:**
```bash
# Replace YOUR_VPS_IP with your actual IP
ssh-copy-id root@YOUR_VPS_IP
```

### Method 2: Manual (If automatic fails)

**Step 2.1: Copy your public key**

**Windows:**
```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

**Mac/Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output (starts with `ssh-ed25519`)

**Step 2.2: Add to VPS**

```bash
# Connect to VPS with password
ssh root@YOUR_VPS_IP

# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key
# Press Ctrl+X, then Y, then Enter to save

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
```

## Step 3: Test SSH Connection

```bash
# Try connecting without password
ssh root@YOUR_VPS_IP

# If it works, you're connected! 🎉
```

## Step 4: Create Deploy User (Security Best Practice)

```bash
# On VPS, as root
adduser deploy

# Add to sudo group
usermod -aG sudo deploy

# Copy SSH keys to deploy user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

## Step 5: Secure SSH Configuration

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config
```

Find and update these lines:
```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 22
```

Save and restart SSH:
```bash
sudo systemctl restart sshd
```

## Step 6: Create SSH Config File (Optional but Convenient)

This lets you connect with just `ssh myserver` instead of `ssh deploy@123.456.789.0`

**Windows:** Create file at `C:\Users\YourUsername\.ssh\config`
**Mac/Linux:** Create file at `~/.ssh/config`

```
Host myserver
    HostName YOUR_VPS_IP
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    Port 22

Host internship-vps
    HostName YOUR_VPS_IP
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    Port 22
```

Now you can connect with:
```bash
ssh myserver
# or
ssh internship-vps
```

## Common SSH Commands

### Connect to VPS
```bash
ssh deploy@YOUR_VPS_IP
# or with config file:
ssh myserver
```

### Copy files TO VPS
```bash
# Copy single file
scp local-file.txt deploy@YOUR_VPS_IP:/var/www/

# Copy directory
scp -r local-folder/ deploy@YOUR_VPS_IP:/var/www/
```

### Copy files FROM VPS
```bash
# Copy single file
scp deploy@YOUR_VPS_IP:/var/www/file.txt ./

# Copy directory
scp -r deploy@YOUR_VPS_IP:/var/www/folder/ ./
```

### Run command on VPS without logging in
```bash
ssh deploy@YOUR_VPS_IP "pm2 status"
ssh deploy@YOUR_VPS_IP "cd /var/www && git pull"
```

### Keep connection alive
Add to your SSH config:
```
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

## Troubleshooting

### "Permission denied (publickey)"

**Check 1:** Verify your public key is on the server
```bash
ssh deploy@YOUR_VPS_IP "cat ~/.ssh/authorized_keys"
```

**Check 2:** Verify permissions
```bash
ssh deploy@YOUR_VPS_IP "ls -la ~/.ssh"
# Should show:
# drwx------ (700) for .ssh directory
# -rw------- (600) for authorized_keys file
```

**Check 3:** Use verbose mode to see what's wrong
```bash
ssh -v deploy@YOUR_VPS_IP
```

### "Connection refused"

**Check 1:** Is SSH service running?
```bash
sudo systemctl status sshd
```

**Check 2:** Is firewall blocking?
```bash
sudo ufw status
# Should show: 22/tcp ALLOW
```

**Check 3:** Correct IP address?
```bash
ping YOUR_VPS_IP
```

### "Host key verification failed"

This happens if you reinstalled your VPS. Remove old key:

**Windows:**
```powershell
ssh-keygen -R YOUR_VPS_IP
```

**Mac/Linux:**
```bash
ssh-keygen -R YOUR_VPS_IP
```

### "Too many authentication failures"

You have too many SSH keys. Specify which one to use:
```bash
ssh -i ~/.ssh/id_ed25519 deploy@YOUR_VPS_IP
```

## Security Best Practices

1. ✅ **Use SSH keys** instead of passwords
2. ✅ **Disable root login** after creating deploy user
3. ✅ **Disable password authentication** 
4. ✅ **Use strong passphrase** for SSH key
5. ✅ **Change default SSH port** (optional)
6. ✅ **Use fail2ban** to block brute force attempts
7. ✅ **Keep private key secure** - never share it!

### Install fail2ban (Recommended)
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Advanced: Change SSH Port (Optional)

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Change line:
Port 2222  # Use any port between 1024-65535

# Update firewall
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp

# Restart SSH
sudo systemctl restart sshd
```

Connect with custom port:
```bash
ssh -p 2222 deploy@YOUR_VPS_IP
```

## Quick Reference Card

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "email@example.com"

# Copy key to server
ssh-copy-id user@server

# Connect
ssh user@server

# Copy file to server
scp file.txt user@server:/path/

# Copy file from server
scp user@server:/path/file.txt ./

# Run remote command
ssh user@server "command"

# Check SSH service
sudo systemctl status sshd

# View SSH logs
sudo tail -f /var/log/auth.log
```

## Windows-Specific: Using PuTTY (Alternative)

If you prefer a GUI:

1. Download PuTTY: https://www.putty.org/
2. Download PuTTYgen (comes with PuTTY)
3. Generate key with PuTTYgen
4. Save private key (.ppk format)
5. Copy public key to VPS
6. Use PuTTY to connect

## Mac-Specific: Using Terminal

Mac has SSH built-in. Just open Terminal and use the commands above.

## Need Help?

- Check verbose output: `ssh -v user@server`
- Check server logs: `sudo tail -f /var/log/auth.log`
- Test connection: `ssh -T user@server`
- Verify key: `ssh-keygen -l -f ~/.ssh/id_ed25519.pub`

## Summary

1. Generate SSH key pair (once)
2. Copy public key to VPS
3. Test connection
4. Create deploy user
5. Secure SSH config
6. Done! 🎉

You can now securely connect to your VPS without passwords!
