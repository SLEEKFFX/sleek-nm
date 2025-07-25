// commands/system.js
const os = require('os');
const { exec } = require('child_process');

const commands = ['.ping', '.uptime', '.restart'];

const startTime = Date.now();

function formatTime(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}

async function run(sock, msg, command) {
  const from = msg.key.remoteJid;

  switch (command) {
    case '.ping': {
      const now = Date.now();
      const latency = now - msg.messageTimestamp * 1000;
      await sock.sendMessage(from, { text: `🏓 Pong! Speed: ${latency}ms` });
      break;
    }

    case '.uptime': {
      const uptime = formatTime(Date.now() - startTime);
      await sock.sendMessage(from, { text: `⏱ Bot Uptime: ${uptime}` });
      break;
    }

    case '.restart': {
      await sock.sendMessage(from, { text: '♻️ Restarting bot...' });
      exec('pm2 restart sleeknm.js || node sleeknm.js', (err) => {
        if (err) console.error('[Restart Error]', err);
        process.exit();
      });
      break;
    }
  }
}

module.exports = { commands, run };