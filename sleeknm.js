// sleeknm.js
const connectToWhatsApp = require('./lib/connect');
const fs = require('fs');
const path = require('path');

// Load command files
const fun = require('./commands/fun');
const admin = require('./commands/admin');
const system = require('./commands/system');
const utility = require('./commands/utility');

async function startBot() {
  const sock = await connectToWhatsApp();

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key && msg.key.remoteJid === 'status@broadcast') return;

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const body = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || 
                 msg.message.imageMessage?.caption || '';

    const command = body.trim().split(' ')[0].toLowerCase();

    // Route commands
    try {
      if (fun.commands.includes(command)) await fun.run(sock, msg, command);
      else if (admin.commands.includes(command)) await admin.run(sock, msg, command);
      else if (system.commands.includes(command)) await system.run(sock, msg, command);
      else if (utility.commands.includes(command)) await utility.run(sock, msg, command);
    } catch (err) {
      console.error(`[❌ ERROR]`, err);
    }
  });
}

startBot();