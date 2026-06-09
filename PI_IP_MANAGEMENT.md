# Raspberry Pi IP Address Management Solutions

## Current Device Information
- **Device Name:** pi5
- **Current IP:** 192.168.0.129
- **MAC Address:** 2CCF6741DB19
- **Connection Type:** Ethernet
- **Hostname:** pi5

## Problem
The Cox router is changing the Pi's IP address via DHCP, causing SSH connection issues and requiring host key updates.

## Solutions (Ranked by Recommendation)

### Solution 1: DHCP Reservation in Router (RECOMMENDED) ⭐

**Why:** Easiest and most reliable. Router assigns the same IP to your Pi's MAC address automatically.

**Steps:**
1. Access your Cox router admin panel:
   - Usually at `http://192.168.0.1` or `http://192.168.1.1`
   - Check router label or Cox account for admin URL
   - Login with admin credentials

2. Navigate to DHCP settings:
   - Look for "DHCP Reservations", "Static IP Assignment", or "Address Reservation"
   - May be under "Advanced" → "Network Settings" → "DHCP"

3. Add reservation:
   - **MAC Address:** `2CCF6741DB19`
   - **IP Address:** `192.168.0.129`
   - **Device Name:** `pi5`
   - **Save/Apply**

4. Restart Pi to get new IP:
   ```bash
   ssh wilberto@192.168.0.129
   sudo reboot
   ```

**Benefits:**
- ✅ No Pi configuration changes needed
- ✅ Works even if Pi is reset
- ✅ Centralized management
- ✅ Router handles IP assignment

---

### Solution 2: Static IP Configuration on Pi

**Why:** Works independently of router settings, but requires knowing router's gateway and DNS.

**Steps (SSH into Pi first):**

1. Find current network configuration:
   ```bash
   ip route | grep default
   # Note the gateway IP (usually 192.168.0.1)
   
   cat /etc/resolv.conf
   # Note DNS servers
   ```

2. Backup current config:
   ```bash
   sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.backup
   ```

3. Edit network configuration:
   ```bash
   sudo nano /etc/dhcpcd.conf
   ```

4. Add to end of file:
   ```bash
   # Static IP configuration for eth0 (Ethernet)
   interface eth0
   static ip_address=192.168.0.129/24
   static routers=192.168.0.1
   static domain_name_servers=192.168.0.1 8.8.8.8
   ```

5. Reboot Pi:
   ```bash
   sudo reboot
   ```

6. Verify IP:
   ```bash
   ip addr show eth0
   # Should show 192.168.0.129
   ```

**Note:** Adjust `routers` and `domain_name_servers` based on your router's gateway IP.

---

### Solution 3: Use Hostname Instead of IP (Quick Fix)

**Why:** Avoids IP address issues by using the device hostname.

**Steps:**

1. Update SSH config on your Mac:
   ```bash
   nano ~/.ssh/config
   ```

2. Add entry:
   ```
   Host pi5
       HostName pi5.local
       User wilberto
       IdentityFile ~/.ssh/id_rsa
   ```

3. Try connecting:
   ```bash
   ssh pi5
   ```

**Note:** Requires mDNS/Bonjour to work. If `pi5.local` doesn't resolve, you may need to install `avahi-daemon` on the Pi:
   ```bash
   sudo apt install avahi-daemon
   sudo systemctl enable avahi-daemon
   sudo systemctl start avahi-daemon
   ```

---

### Solution 4: SSH Config with IP Fallback

**Why:** Provides flexibility with automatic host key management.

**Steps:**

1. Update SSH config:
   ```bash
   nano ~/.ssh/config
   ```

2. Add entry:
   ```
   Host pi5
       HostName 192.168.0.129
       User wilberto
       IdentityFile ~/.ssh/id_rsa
       StrictHostKeyChecking accept-new
       UserKnownHostsFile ~/.ssh/known_hosts_pi5
   ```

3. Connect using hostname:
   ```bash
   ssh pi5
   ```

**Benefits:**
- ✅ Easy to remember: `ssh pi5`
- ✅ Isolated host keys per device
- ✅ Less strict host key checking

---

## Recommended Approach

**Best Practice:** Combine Solution 1 (DHCP Reservation) + Solution 4 (SSH Config)

1. Set DHCP reservation in router (prevents IP changes)
2. Configure SSH config for easy access (`ssh pi5`)
3. Never worry about IP changes again!

---

## Troubleshooting

### If IP still changes after DHCP reservation:
- Verify MAC address is correct: `ip link show eth0` on Pi
- Check router logs to see if reservation is active
- Ensure reservation is saved and router is restarted

### If static IP doesn't work:
- Verify gateway IP is correct
- Check router's DHCP range doesn't conflict
- Ensure subnet mask is correct (usually /24 for 192.168.0.x)

### If hostname doesn't resolve:
- Install `avahi-daemon` on Pi
- Check firewall allows mDNS (port 5353)
- Try `ping pi5.local` to test resolution

---

## Quick Reference

**Current Pi Details:**
- IP: `192.168.0.129`
- MAC: `2CCF6741DB19`
- Hostname: `pi5`
- SSH: `ssh wilberto@192.168.0.129`

**After implementing Solution 1:**
- SSH: `ssh pi5` (if using SSH config)
- Or: `ssh wilberto@192.168.0.129` (IP will remain stable)
