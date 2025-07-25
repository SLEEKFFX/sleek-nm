// commands/admin.js
const commands = ['.kick', '.promote', '.demote', '.lockgc', '.unlockgc', '.tagall'];

async function run(sock, msg, command) {
  const from = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const isGroup = from.endsWith('@g.us');

  if (!isGroup) return sock.sendMessage(from, { text: '⚠️ This command is only for groups.' });

  const groupMetadata = await sock.groupMetadata(from);
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
  const isAdmin = admins.includes(sender);

  if (!isAdmin) return sock.sendMessage(from, { text: '❌ You must be an admin to use this.' });

  switch (command) {
    case '.kick': {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned) return sock.sendMessage(from, { text: 'Tag the user to kick.' });
      await sock.groupParticipantsUpdate(from, mentioned, 'remove');
      break;
    }

    case '.promote': {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned) return sock.sendMessage(from, { text: 'Tag the user to promote.' });
      await sock.groupParticipantsUpdate(from, mentioned, 'promote');
      break;
    }

    case '.demote': {
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned) return sock.sendMessage(from, { text: 'Tag the user to demote.' });
      await sock.groupParticipantsUpdate(from, mentioned, 'demote');
      break;
    }

    case '.lockgc':
      await sock.groupSettingUpdate(from, 'announcement'); // Only admins can send
      await sock.sendMessage(from, { text: '🔒 Group locked. Only admins can send messages.' });
      break;

    case '.unlockgc':
      await sock.groupSettingUpdate(from, 'not_announcement'); // Everyone can send
      await sock.sendMessage(from, { text: '🔓 Group unlocked. Everyone can send messages.' });
      break;

    case '.tagall': {
      const mentions = groupMetadata.participants.map(p => p.id);
      const text = mentions.map(u => `@${u.split('@')[0]}`).join(' ');
      await sock.sendMessage(from, { text: `🔊 Tagging all:\n${text}`, mentions });
      break;
    }
  }
}

module.exports = { commands, run };