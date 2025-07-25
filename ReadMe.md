# 💬 SLEEKNM-Bot (Mini WhatsApp Bot)

A lightweight, pair-code-only WhatsApp bot powered by Baileys.  
Designed to run on low-RAM (256MB) Node.js hosting like `bot-hosting.net`.

---

## 📁 Project Structure
SLEEKNM-Bot/ ├── sleeknm.js               # Main bot file ├── lib/ │   └── connect.js           # WhatsApp socket login (pair code) ├── commands/ │   ├── fun.js               # Fun commands │   ├── admin.js             # Group admin tools │   ├── system.js            # System-level (uptime, ping, restart) │   └── utility.js           # View-once save, sticker, quotes ├── database/ │   └── settings.json        # Welcome/goodbye toggle state ├── media/ │   └── menu.jpg             # Menu image ├── package.json             # Node project config
---

## ⚙️ Setup Instructions

1. **Clone or Upload Project**
   ```bash
   cd SLEEKNM-Bot

## Install required packages 
npm install @whiskeysockets/baileys wa-sticker-formatter

## Run the bot 
node sleeknm.js

🤖 Main Features

👥 GC & FUN MENU

.gaycheck – % gay check

.rate – Bot rates you 1-100

.dare / .truth – Random challenges

.mindreader – Reads your thoughts

.soulmate – Tags 2 random members

.smartcheck, .networth, .facts

.redpill / .bluepill simulation

.biblequote / .quranquote – spiritual wisdom

.vv – Save view-once as normal image

.sticker – Make sticker from image


🛡️ ADMIN MENU

.kick @user

.promote @user

.demote @user

.lockgc / .unlockgc

.tagall – tag every member


⚙️ SYSTEM MENU

.ping – Bot speed

.uptime – How long bot is active

.restart – Restarts the bot

.menu – Show all commands + image


🧠 Group Auto Features

Welcome & goodbye messages (toggle via settings.json)

Created by

SLEEKNM Bot Engine — For demo, fun & lightweight automation.


---

🧩 Hosting Suggestions

NodeJS panel with at least:

✅ Node.js v18+

✅ 250–300MB RAM

✅ Auto restart (PM2 or bot-hosting.net panel)




---

🧼 To-Do (Optional)

Add database for per-group configs

Add buttons, buttons template

Add NSFW toggle (if wanted)

