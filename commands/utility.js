// commands/utility.js
const fs = require('fs');
const { writeFile } = require('fs/promises');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

const commands = ['.vv', '.sticker', '.biblequote', '.quranquote'];

const bibleQuotes = [
  "Philippians 4:13 – I can do all things through Christ who strengthens me.",
  "John 3:16 – For God so loved the world...",
  "Psalm 23:1 – The Lord is my shepherd, I shall not want.",
];

const quranQuotes = [
  "Surah Al-Baqarah 2:286 – Allah does not burden a soul beyond what it can bear.",
  "Surah Ad-Duhaa 93:5 – And your Lord is going to give you, and you will be satisfied.",
  "Surah Al-Imran 3:139 – So do not lose heart nor fall into despair."
];

async function run(sock, msg, command) {
  const from = msg.key.remoteJid;

  switch (command) {
    case '.vv': {
      const viewOnce = msg.message?.viewOnceMessageV2?.message?.imageMessage;
      if (!viewOnce) return sock.sendMessage(from, { text: '❌ Reply to a view-once image with `.vv`' });

      const stream = await downloadContentFromMessage(viewOnce, 'image');
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

      await sock.sendMessage(from, { image: buffer, caption: '📸 View Once saved as normal image' }, { quoted: msg });
      break;
    }

    case '.sticker': {
      const img = msg.message?.imageMessage;
      if (!img) return sock.sendMessage(from, { text: '❌ Send or reply to an image with `.sticker`' });

      const stream = await downloadContentFromMessage(img, 'image');
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

      const sticker = new Sticker(buffer, {
        pack: 'SLEEKNM',
        author: 'SLEEKNM',
        type: StickerTypes.FULL,
        quality: 70
      });

      const stickerBuffer = await sticker.toBuffer();
      await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });
      break;
    }

    case '.biblequote': {
      const quote = bibleQuotes[Math.floor(Math.random() * bibleQuotes.length)];
      await sock.sendMessage(from, { text: `📖 *Bible Quote*\n${quote}` });
      break;
    }

    case '.quranquote': {
      const quote = quranQuotes[Math.floor(Math.random() * quranQuotes.length)];
      await sock.sendMessage(from, { text: `📿 *Quran Quote*\n${quote}` });
      break;
    }
  }
}

module.exports = { commands, run };