# Deployment Plan: Raspberry Pi 5 + PM2 + Cloudflare Tunnel

## Overview

Deploy the static Vite React build to Raspberry Pi 5, manage it with PM2, and expose it publicly via Cloudflare Tunnel (cloudflared) to serve micalpacheco.com (root domain, not subdomain).

## Architecture

```
Internet → Cloudflare DNS → Cloudflare Tunnel → Raspberry Pi 5 (localhost:3002) → PM2 → serve (dist/)
```

**Note:** Port 3002 is used because:
- Port 3000 is used by `socket-painting-app`
- Port 3001 is used by `tic-tac-toe-app`

## Prerequisites

- Raspberry Pi 5 with Raspberry Pi OS installed
- SSH access to the Pi
- Cloudflare account with domain `micalpacheco.com` added
- Domain DNS managed by Cloudflare

## Step-by-Step Deployment

### 1. Raspberry Pi 5 Setup

**1.1 Update system packages**

```bash
sudo apt update && sudo apt upgrade -y
```

**1.2 Install Node.js (LTS version)**

```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify installation
```

**1.3 Install global dependencies**

```bash
sudo npm install -g pm2 serve
```

**1.4 Install Cloudflare Tunnel (cloudflared)**

```bash
# Download and install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared-linux-arm64.deb
cloudflared --version  # Verify installation
```

### 2. Deploy Application

**2.1 Clone repository**

```bash
cd ~
git clone https://github.com/wilbertopachecob/nurse_practitioner-landing-page.git
cd nurse_practitioner-landing-page
```

**2.2 Install dependencies and build**

```bash
npm install
npm run build
```

**2.3 Verify build output**

```bash
ls -la dist/  # Should contain index.html and assets
```

**2.4 Check port availability**

Before deploying, verify that port 3002 is available:

```bash
# Check what ports are currently in use
pm2 list  # Check running PM2 processes
netstat -tulpn | grep :3002  # Check if port 3002 is in use
# OR
lsof -i :3002  # Alternative method to check port usage

# Check what ports your other apps are using
pm2 describe socket-painting-app  # Uses port 3000
pm2 describe tic-tac-toe-app      # Uses port 3001
```

**Current port assignments:**
- Port 3000: `socket-painting-app` (socketPaintingOnCanvas)
- Port 3001: `tic-tac-toe-app` (tic_tac_toe)
- Port 3002: `nurse-practitioner-landing` (this app)

If port 3000 is already in use, you have two options:

**Option A: Use a different port** (recommended if 3000 is taken)
- Update `ecosystem.config.cjs` to use a different port (e.g., 3001, 3002, 8080)
- Update Cloudflare Tunnel config to point to the new port
- **Note:** This deployment uses port 3002 as:
  - Port 3000 is used by `socket-painting-app`
  - Port 3001 is used by `tic-tac-toe-app`

**Option B: Check and stop conflicting service**
- Identify which service is using port 3000
- Stop it or reconfigure it to use a different port

### 3. Configure PM2

**3.1 Verify ecosystem.config.cjs** (if needed)

The existing `ecosystem.config.cjs` is already configured correctly:

**Note:** The file uses `.cjs` extension because the project uses ES modules (`"type": "module"` in package.json). PM2 requires CommonJS syntax for config files.

- Uses `serve -s dist -l 3002` to serve static files
- Runs on port 3002 (ports 3000 and 3001 are already in use)
- Auto-restart enabled

**3.2 Start application with PM2**

```bash
pm2 start ecosystem.config.cjs
pm2 status  # Verify it's running
pm2 logs nurse-practitioner-landing  # Check logs
```

**Note:** Use `ecosystem.config.cjs` (not `.js`) because the project uses ES modules.

**3.3 Configure PM2 to start on boot**

```bash
pm2 save
pm2 startup  # Follow the command it outputs (requires sudo)
```

**3.4 Test locally**

```bash
curl http://localhost:3002  # Should return HTML
```

### 4. Cloudflare Tunnel Setup

**4.1 Authenticate cloudflared**

```bash
cloudflared tunnel login
# This opens a browser - log in and authorize
```

**4.2 Create tunnel**

```bash
cloudflared tunnel create micalpacheco-tunnel
# Note the tunnel UUID that's created
```

**4.3 Add domain to Cloudflare (REQUIRED FIRST STEP)**

**CRITICAL:** Before configuring the tunnel, you MUST add `micalpacheco.com` as a domain in Cloudflare:

1. **Add Domain to Cloudflare:**
   - Go to Cloudflare Dashboard → Add a Site
   - Enter `micalpacheco.com` (without www)
   - Select a plan (Free plan is fine)
   - Cloudflare will scan your DNS records
   - **Update nameservers** at your domain registrar to Cloudflare's nameservers (see explanation below)
   - Wait for DNS propagation (can take a few minutes to hours)

   **What "Update nameservers" means:**
   - **Nameservers** are the servers that tell the internet where to find your domain's DNS records
   - When you add a domain to Cloudflare, Cloudflare gives you 2 nameservers (like `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
   - You need to tell your **domain registrar** (where you bought `micalpacheco.com`) to use Cloudflare's nameservers
   - **IMPORTANT:** Nameservers are set at your **domain registrar**, NOT in Shopify or Cloudflare DNS records
   
   **How to update nameservers (if domain purchased at Shopify):**
   
   Since you purchased `micalpacheco.com` at Shopify, Shopify IS your domain registrar. Here's how to update:
   
   1. **Get Cloudflare nameservers:**
      - After adding domain to Cloudflare, go to Cloudflare Dashboard → Overview for `micalpacheco.com`
      - Cloudflare will show you 2 nameservers (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
      - Copy these nameservers
   
   2. **Update nameservers in Shopify:**
      - Log into Shopify Admin
      - Go to Settings → Domains
      - Click on `micalpacheco.com`
      - Find "Nameservers" section
      - Click "Change" button
      - Select "Use custom nameservers"
      - Enter Cloudflare's nameservers (the 2 nameservers from step 1)
      - Click "Save"
   
   3. **Important Shopify warning:**
      - Shopify will warn: "Your domain will no longer be managed by Shopify"
      - This is expected and OK if you're migrating to Cloudflare Tunnel
      - Your Shopify store may stop working unless you configure DNS records in Cloudflare to point back to Shopify
      - **If you're fully migrating away from Shopify to your Pi hosting**, this is fine
      - **If you still need Shopify**, you'll need to add DNS records in Cloudflare pointing to Shopify
   
   4. **Wait for propagation:**
      - DNS changes can take a few minutes to 48 hours
      - Check Cloudflare Dashboard → Overview → It should show "Active" when nameservers are updated
   
   **If domain purchased elsewhere (GoDaddy, Namecheap, etc.):**
   - Log into your domain registrar's website
   - Go to DNS/Nameserver settings
   - Replace nameservers with Cloudflare's nameservers
   - Save changes

2. **Verify Domain is Active:**
   - Go to Cloudflare Dashboard → Overview
   - Ensure `micalpacheco.com` appears in your domain list
   - Status should show as "Active"

**Important:** The domain MUST be added to Cloudflare BEFORE configuring tunnel routes. Otherwise, Cloudflare will create subdomains under your existing domain (like `wilbertopachecob.dev`).

**4.4 Create tunnel configuration file (PRIMARY METHOD)**

**This is the most reliable method** - configure the tunnel using a config file:

1. **Get your tunnel UUID:**
   ```bash
   cloudflared tunnel list
   # Note the UUID for micalpacheco-tunnel (should be: 90e969aa-9b53-49b3-b1ae-5ee3d1f49804)
   ```

2. **Create the config file:**
   
   Create `/home/pi/.cloudflared/config.yml`:

   ```bash
   mkdir -p ~/.cloudflared
   nano ~/.cloudflared/config.yml
   ```

   Paste this configuration (replace `<TUNNEL_UUID>` with your actual tunnel UUID: `90e969aa-9b53-49b3-b1ae-5ee3d1f49804`):

   ```yaml
   tunnel: 90e969aa-9b53-49b3-b1ae-5ee3d1f49804
   credentials-file: /home/wilberto/.cloudflared/90e969aa-9b53-49b3-b1ae-5ee3d1f49804.json

   ingress:
     # Root domain (primary) - this is what you want
     - hostname: micalpacheco.com
       service: http://localhost:3002
     # Optional: www subdomain (serves same content)
     - hostname: www.micalpacheco.com
       service: http://localhost:3002
     # Catch-all for other hostnames
     - service: http_status:404
   ```

   Save and exit (Ctrl+X, then Y, then Enter in nano)

3. **Verify the credentials file exists:**
   ```bash
   ls -la ~/.cloudflared/*.json
   # Should show: 90e969aa-9b53-49b3-b1ae-5ee3d1f49804.json
   ```

**Important:** 
- The root domain `micalpacheco.com` is listed first and is your primary domain
- Make sure `micalpacheco.com` is added to Cloudflare (step 4.3) before this will work
- The config file method is more reliable than Dashboard UI which may vary

**4.5 Create DNS records manually (REQUIRED)**

After creating the config file, you need to update DNS records in Cloudflare:

1. **Go to Cloudflare Dashboard:**
   - Select `micalpacheco.com` domain
   - Go to DNS → Records

2. **Delete existing A/AAAA records for root domain (if pointing to Shopify/other service):**
   - Find the A record: `micalpacheco.com` → `23.227.38.73` (or similar IP)
   - Click "Delete" on that record
   - Find the AAAA record: `micalpacheco.com` → `2620:127:f00f:d::` (or similar IPv6)
   - Click "Delete" on that record
   - **Why:** Cloudflare Tunnels require CNAME records, not A records. You can't have both.

3. **Add CNAME record for root domain:**
   - Click "+ Add record"
   - **Type:** CNAME
   - **Name:** `@` (or leave empty for root domain `micalpacheco.com`)
   - **Target:** `90e969aa-9b53-49b3-b1ae-5ee3d1f49804.cfargotunnel.com`
   - **Proxy status:** Proxied (orange cloud icon - make sure it's ON)
   - Click "Save"

4. **Update www subdomain CNAME:**
   - Find the existing `www` CNAME record (currently pointing to `shops.myshopify.com`)
   - Click on it to edit, OR delete it and create a new one
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `90e969aa-9b53-49b3-b1ae-5ee3d1f49804.cfargotunnel.com`
     - **Same tunnel target** - This points to the same Cloudflare Tunnel as the root domain
   - **Proxy status:** Proxied (orange cloud icon - make sure it's ON)
   - Click "Save"

**Important Notes:**
- You MUST delete the A/AAAA records before adding the CNAME for root domain
- Both records should be "Proxied" (orange cloud), not "DNS only" (gray cloud)
- The tunnel UUID (`90e969aa-9b53-49b3-b1ae-5ee3d1f49804`) must match your tunnel

**4.6 Test tunnel**

```bash
cloudflared tunnel run micalpacheco-tunnel
# Keep this running to test - should see connection established
```

### 5. Run Cloudflare Tunnel as Service

**5.1 Install tunnel as systemd service**

```bash
sudo cloudflared service install
```

**5.2 Configure service**

Edit `/etc/cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_UUID>
credentials-file: /home/pi/.cloudflared/<TUNNEL_UUID>.json

ingress:
  # Root domain (primary)
  - hostname: micalpacheco.com
    service: http://localhost:3002
  # Optional: www subdomain (serves same content)
  - hostname: www.micalpacheco.com
    service: http://localhost:3002
  # Catch-all for other hostnames
  - service: http_status:404
```

**5.3 Start and enable service**

```bash
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
sudo systemctl status cloudflared  # Verify running
```

### 6. Configure Cache Headers for Performance

**6.1 Cloudflare Cache Configuration**

To optimize performance and reduce bandwidth, configure cache headers in Cloudflare Dashboard:

1. **Go to Cloudflare Dashboard:**
   - Navigate to `micalpacheco.com` → Caching → Configuration

2. **Configure Cache Rules:**
   - Create Page Rules or use Cache Rules (newer feature) to set cache headers:
   
   **For Static Assets (Images, CSS, JS):**
   - **Pattern:** `micalpacheco.com/images/*` OR `micalpacheco.com/assets/*`
   - **Cache Level:** Standard
   - **Edge Cache TTL:** 1 year (31536000 seconds)
   - **Browser Cache TTL:** Respect Existing Headers
   - **Note:** Vite already adds hash-based filenames (e.g., `index-CkOnz60f.js`) for cache busting

   **For HTML Files:**
   - **Pattern:** `micalpacheco.com/` OR `micalpacheco.com/index.html`
   - **Cache Level:** Bypass (or Standard with short TTL)
   - **Edge Cache TTL:** 1 hour (3600 seconds) or Bypass
   - **Browser Cache TTL:** Respect Existing Headers
   - **Reason:** HTML changes frequently and should not be cached long

3. **Alternative: Use Cloudflare Transform Rules (Advanced):**
   - Go to Rules → Transform Rules → Modify Response Header
   - Create rules to set `Cache-Control` headers:
     - For `/images/*` and `/assets/*`: `Cache-Control: public, max-age=31536000, immutable`
     - For `/`: `Cache-Control: public, max-age=3600`

4. **Verify Cache Headers:**
   ```bash
   # Check cache headers on deployed site
   curl -I https://micalpacheco.com/images/MPFInalImages-4_Original.jpeg
   curl -I https://micalpacheco.com/assets/index-CkOnz60f.js
   curl -I https://micalpacheco.com/
   ```

**Expected Results:**
- Images and assets should have `Cache-Control: public, max-age=31536000` (1 year)
- HTML should have shorter cache or `no-cache`
- Vite's hash-based filenames ensure cache busting when content changes

**6.2 Server-Side Cache Headers (Optional - if not using Cloudflare)**

If serving directly without Cloudflare, configure cache headers in your web server:

**For Nginx:**
```nginx
# In nginx.conf or site config
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    expires 1h;
    add_header Cache-Control "public, max-age=3600";
}
```

**For Apache (.htaccess):**
```apache
# Cache static assets for 1 year
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Cache HTML for 1 hour
<FilesMatch "\.(html)$">
    Header set Cache-Control "public, max-age=3600"
</FilesMatch>
```

**Note:** Since this deployment uses Cloudflare Tunnel, Cloudflare Dashboard configuration is the recommended approach.

### 7. Cloudflare DNS Configuration

**7.1 Verify Domain in Cloudflare**

- Ensure `micalpacheco.com` (not a subdomain) is added to your Cloudflare account
- Go to Cloudflare Dashboard → Select `micalpacheco.com` domain
- Verify the domain is active and DNS is managed by Cloudflare

**6.2 Verify DNS Records**

After creating DNS records manually (step 4.5), verify they exist:

- Go to Cloudflare Dashboard → DNS → Records (for `micalpacheco.com` domain)
- You should see:
  - `@` (or root domain) → CNAME → `90e969aa-9b53-49b3-b1ae-5ee3d1f49804.cfargotunnel.com` (Proxied)
  - `www` → CNAME → `90e969aa-9b53-49b3-b1ae-5ee3d1f49804.cfargotunnel.com` (Proxied, if configured)

**6.3 SSL/TLS Settings**

- Go to SSL/TLS → Overview
- Set SSL/TLS encryption mode to "Full" or "Full (strict)"
- Go to SSL/TLS → Edge Certificates
- Enable "Always Use HTTPS" (redirects HTTP to HTTPS)
- Enable "Automatic HTTPS Rewrites"

**6.4 Fix Incorrect DNS Records (if needed)**

If you see incorrect records like `www.micalpacheco.com.wilbertopachecob.dev`:
1. Delete the incorrect record
2. Add the correct Public Hostname via Dashboard (see step 4.4)
3. Verify the new record shows `micalpacheco.com` → `*.cfargotunnel.com`

### 7. Verification & Monitoring

**7.1 Check services**

```bash
pm2 status
pm2 logs nurse-practitioner-landing
sudo systemctl status cloudflared
sudo journalctl -u cloudflared -f  # View tunnel logs
```

**7.2 Test domain**

- Visit `https://micalpacheco.com` in browser (root domain)
- Optionally test `https://www.micalpacheco.com` (if configured)
- Verify SSL certificate (should be Cloudflare's)
- Test all pages and functionality
- Verify you're accessing the root domain, not a subdomain

**7.3 Monitor resources**

```bash
pm2 monit  # Monitor PM2 processes
htop  # Monitor system resources
```

## Maintenance Commands

**Update application:**

```bash
cd ~/nurse_practitioner-landing-page
git pull
npm install
npm run build
pm2 restart nurse-practitioner-landing
```

**View logs:**

```bash
pm2 logs nurse-practitioner-landing
sudo journalctl -u cloudflared -n 50
```

**Restart services:**

```bash
pm2 restart nurse-practitioner-landing
sudo systemctl restart cloudflared
```

## Security Considerations

1. **Firewall**: Ensure Pi firewall allows only necessary ports (SSH, localhost)
2. **SSH**: Use key-based authentication, disable password login
3. **Updates**: Regularly update system packages and Node.js
4. **PM2**: Runs as non-root user (pi)
5. **Cloudflare Tunnel**: Provides DDoS protection and hides Pi's IP address

## Troubleshooting

- **PM2 not starting**: Check `pm2 logs` for errors
- **Tunnel not connecting**: Verify credentials and config file paths
- **Domain not resolving**: Check Cloudflare DNS settings and tunnel route
- **502 errors**: Ensure PM2 service is running on port 3002
- **SSL errors**: Verify Cloudflare SSL/TLS mode is set correctly

### Updated image or static file still shows old version

**Symptoms:** You updated files via `git pull` and restarted PM2, but the site still serves the old image (or other static file), e.g. when downloading or viewing the profile image.

**Cause:** PM2 serves the **built** site from `dist/`. Restarting PM2 does **not** rebuild the app; it only restarts the process. So `dist/` still contains the old files until you run `npm run build` again. Also, browsers and Cloudflare may cache the old image.

**Fix on the Pi:**

1. **Rebuild after every pull** (required):
   ```bash
   cd ~/nurse_practitioner-landing-page
   git pull
   npm install
   npm run build    # ← Required: copies public/ (including images) into dist/
   pm2 restart nurse-practitioner-landing
   ```

2. **Verify the new file is in the build:**
   ```bash
   ls -la dist/images/
   # Check date/size of the image to confirm it's the new one
   ```

3. **Bypass caches** so you see the new image:
   - **Browser:** Hard refresh (e.g. Ctrl+Shift+R or Cmd+Shift+R) or open the site in a private/incognito window.
   - **Cloudflare:** In Cloudflare Dashboard → Caching → Configuration → **Purge Everything** (or purge the specific image URL), then reload the page.

**Summary:** Always run `npm run build` after `git pull` before restarting PM2; then clear browser/Cloudflare cache if the old file still appears.

### Error 1033: Cloudflare Tunnel Error (Tunnel Not Connecting)

**Symptoms:** Error 1033 page when visiting your domain. Message: "Cloudflare is currently unable to resolve it" or "Ensure that cloudflared is running and can reach the network."

**If other tunnels on the same machine are working:**
- This means cloudflared service is running and network is fine
- The issue is specific to `micalpacheco-tunnel`
- Focus on tunnel-specific configuration and the local app (PM2)

**Note about IP address changes:**
- **Local IP changes (e.g., 192.168.0.132 → 192.168.0.129) do NOT affect Cloudflare Tunnel**
- Cloudflare Tunnel uses outbound connections FROM your Pi TO Cloudflare
- Cloudflare doesn't need to know your Pi's local IP address
- The tunnel config uses `localhost:3002` which always refers to the local machine
- **However:** If your Pi rebooted (which could cause IP change), services might not have started properly

**Common Causes & Solutions:**

1. **PM2 service stopped (MOST COMMON if other tunnels work):**
   ```bash
   # Check PM2 status - is nurse-practitioner-landing running?
   pm2 status
   
   # If stopped or errored, restart it
   pm2 restart nurse-practitioner-landing
   
   # Check PM2 logs for errors
   pm2 logs nurse-practitioner-landing --lines 50
   
   # Verify app is accessible locally on port 3002
   curl http://localhost:3002
   # Should return HTML, not connection refused
   ```

2. **Tunnel not running/configured for this specific tunnel:**
   ```bash
   # Check which tunnels are configured
   cloudflared tunnel list
   
   # IMPORTANT: Check BOTH config files
   cat /etc/cloudflared/config.yml  # System config (used by service)
   cat ~/.cloudflared/config.yml    # User config (may not be used)
   
   # The cloudflared SERVICE uses /etc/cloudflared/config.yml
   # If your tunnel config is only in ~/.cloudflared/config.yml, it won't work!
   # Solution: Copy config to system location OR add to existing system config
   ```
   
   **Common Issue:** Config file mismatch
   - If `/etc/cloudflared/config.yml` exists, cloudflared service uses that
   - If your tunnel config is only in `~/.cloudflared/config.yml`, it's ignored
   - **Fix:** Add your tunnel config to `/etc/cloudflared/config.yml` or copy your config there

3. **cloudflared service stopped (if NO tunnels work):**
   ```bash
   # Check if cloudflared is running
   sudo systemctl status cloudflared
   
   # If not running, start it
   sudo systemctl start cloudflared
   
   # Enable it to start on boot (if not already)
   sudo systemctl enable cloudflared
   
   # Check logs for errors
   sudo journalctl -u cloudflared -n 50 --no-pager
   ```

2. **PM2 service stopped (local app not running):**
   ```bash
   # Check PM2 status
   pm2 status
   
   # If nurse-practitioner-landing is stopped, restart it
   pm2 restart nurse-practitioner-landing
   
   # Check PM2 logs
   pm2 logs nurse-practitioner-landing --lines 50
   
   # Verify app is accessible locally
   curl http://localhost:3002
   ```

3. **Pi rebooted and services didn't start:**
   ```bash
   # Check if cloudflared auto-starts on boot
   sudo systemctl is-enabled cloudflared
   # Should return "enabled"
   
   # If not enabled, enable it
   sudo systemctl enable cloudflared
   
   # Check PM2 startup
   pm2 startup
   # Follow the command it outputs (if needed)
   pm2 save
   ```

4. **Config file issues:**
   ```bash
   # Check if config file exists
   cat /etc/cloudflared/config.yml
   # OR
   cat ~/.cloudflared/config.yml
   
   # Verify tunnel UUID matches
   # Verify credentials file path is correct
   # Verify ingress hostname matches your domain
   ```

5. **Network connectivity issues:**
   ```bash
   # Check if Pi can reach internet
   ping -c 3 8.8.8.8
   
   # Check if cloudflared can connect
   sudo journalctl -u cloudflared -f
   # Look for connection errors
   ```

6. **Credentials expired or invalid:**
   ```bash
   # Re-authenticate cloudflared
   cloudflared tunnel login
   
   # Verify credentials file exists
   ls -la ~/.cloudflared/*.json
   ```

**Quick Fix Checklist (if other tunnels work):**
1. ✅ Check PM2: `pm2 status` - Is `nurse-practitioner-landing` running?
2. ✅ Test local app: `curl http://localhost:3002` - Should return HTML
3. ✅ Restart PM2: `pm2 restart nurse-practitioner-landing`
4. ✅ Verify tunnel config: `cat /etc/cloudflared/config.yml` - Check tunnel UUID and ingress
5. ✅ Check cloudflared logs: `sudo journalctl -u cloudflared -n 50` - Look for tunnel-specific errors

**Quick Fix Checklist (if NO tunnels work):**
1. ✅ Check cloudflared: `sudo systemctl status cloudflared`
2. ✅ Check PM2: `pm2 status`
3. ✅ Test local app: `curl http://localhost:3002`
4. ✅ Restart both: `sudo systemctl restart cloudflared && pm2 restart nurse-practitioner-landing`
5. ✅ Check logs: `sudo journalctl -u cloudflared -n 50`

### Fixing Incorrect DNS Records and Tunnel Configuration

**Problem:** If you see DNS records like `www.micalpacheco.com.wilbertopachecob.dev` instead of `micalpacheco.com`, or the tunnel shows as INACTIVE:

**Root Cause:** The domain `micalpacheco.com` was not added to Cloudflare before creating the tunnel route, so Cloudflare created a subdomain under your existing domain.

**Solution Steps:**

1. **Add domain to Cloudflare (if not done):**
   - Go to Cloudflare Dashboard → Add a Site
   - Enter `micalpacheco.com`
   - Complete the setup and update nameservers at your registrar
   - Wait for DNS propagation

2. **Delete incorrect DNS records:**
   - Go to Cloudflare Dashboard → DNS → Records
   - Find any record with `wilbertopachecob.dev` or `www.micalpacheco.com.wilbertopachecob.dev`
   - Delete it

3. **Create correct config file:**
   - Follow step 4.4 to create `/home/pi/.cloudflared/config.yml` with `micalpacheco.com` as hostname
   - Follow step 4.5 to create DNS records manually in Cloudflare Dashboard

4. **Verify tunnel is ACTIVE:**
   - The tunnel status should show "ACTIVE" (not "INACTIVE")
   - If INACTIVE, ensure the tunnel service is running: `sudo systemctl status cloudflared`
   - Start it if needed: `sudo systemctl start cloudflared`

5. **Verify DNS records:**
   - Go to Cloudflare Dashboard → DNS → Records (for `micalpacheco.com` domain)
   - Should see: `@` (or `micalpacheco.com`) → CNAME → `90e969aa-9b53-49b3-b1ae-5ee3d1f49804.cfargotunnel.com`
   - Should NOT see: `*.wilbertopachecob.dev` or any subdomain records

6. **Update tunnel config file** (if using file-based config):
   - Ensure `/etc/cloudflared/config.yml` has `micalpacheco.com` (not www) as primary hostname
   - Restart tunnel: `sudo systemctl restart cloudflared`

**Important:** 
- The root domain `micalpacheco.com` should be your primary domain
- The tunnel must be ACTIVE for it to work
- Always add the domain to Cloudflare FIRST before configuring tunnel routes
- Use the Dashboard method (not CLI) for managing Public Hostnames - it's more reliable
