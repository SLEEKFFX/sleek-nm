// commands/fun.js
const fs = require('fs');
const path = require('path');

const commands = [
  '.menu', '.gaycheck', '.rate', '.dare', '.truth',
  '.mindreader', '.soulmate', '.smartcheck', '.facts',
  '.networth', '.redpill', '.bluepill'
];

const dares = [
  "Call your crush and confess 😳",
  "Send a voice note saying 'I miss you' to your ex 😂",
  "Say 'I'm a goat' in the group 🐐",
  "Post your most recent selfie 😬"
];

const truths = [
  "Have you ever cheated in a relationship?",
  "Do you still stalk your ex?",
  "Who's your crush in this group?",
  "What's your most embarrassing moment?"
];

const facts = [
  "Honey never spoils 🍯",
  "Octopuses have three hearts 🐙",
  "Bananas are berries 🍌 but strawberries aren't!",
  "There’s enough gold in Earth’s core to coat the planet"
];

async function run(sock, msg, command) {
  const from = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const groupMetadata = from.endsWith('@g.us') ? await sock.groupMetadata(from) : null;
  const participants = groupMetadata?.participants || [];

  const randomTag = () => participants[Math.floor(Math.random() * participants.length)].id;
  const mention = (id) => '@' + id.split('@')[0];

  switch (command) {
    case '.menu':
      const menuText = `
╔══⭓ *SLEEKNM v0.01*
╠⭓ _LIGHTWEIGHT BOT • 256MB_
╠⭓ *Commands List:*
╠══⭓ *FUN MENU*
║⭓ .gaycheck | .rate | .dare | .truth
║⭓ .mindreader | .soulmate | .smartcheck | .facts
║⭓ .networth | .redpill | .bluepill
╠══⭓ *GROUP TOOLS*
║⭓ .welcome | .goodbye | .delete | .invite | .tagall
╠══⭓ *ADMIN MENU*
║⭓ .kick | .promote | .demote | .lockgc | .unlockgc
╠══⭓ *SYSTEM*
║⭓ .menu | .ping | .uptime | .restart
╚══⭓ > _Bot by SLEEKNM_
`.trim();
      await sock.sendMessage(from, {
        image: fs.readFileSync('./media/menu.jpg'),
        caption: menuText
      }, { quoted: msg });
      break;

    case '.gaycheck':
      const gayPercent = Math.floor(Math.random() * 100) + 1;
      await sock.sendMessage(from, { text: `🌈 ${mention(sender)} is *${gayPercent}% gay*! 😂`, mentions: [sender] });
      break;

    case '.rate':
      const ratePercent = Math.floor(Math.random() * 100) + 1;
      await sock.sendMessage(from, { text: `📊 I rate ${mention(sender)} *${ratePercent}/100* 💯`, mentions: [sender] });
      break;

    case '.dare':
      const dare = dares[Math.floor(Math.random() * dares.length)];
      await sock.sendMessage(from, { text: `😈 *Your Dare:* ${dare}` });
      break;

    case '.truth':
      const truth = truths[Math.floor(Math.random() * truths.length)];
      await sock.sendMessage(from, { text: `🤔 *Truth:* ${truth}` });
      break;

    case '.mindreader':
      const thoughts = ["You're thinking of food 🍗", "You're missing someone 💔", "You're horny 😂", "You're broke 💸"];
      await sock.sendMessage(from, { text: `🧠 ${mention(sender)}: ${thoughts[Math.floor(Math.random() * thoughts.length)]}`, mentions: [sender] });
      break;

    case '.soulmate':
      const p1 = randomTag();
      let p2;
      do { p2 = randomTag(); } while (p2 === p1);
      await sock.sendMessage(from, {
        text: `💞 Soulmate Match!\n${mention(p1)} ❤️ ${mention(p2)}`,
        mentions: [p1, p2]
      });
      break;

    case '.smartcheck':
      const iq = Math.floor(Math.random() * 150) + 1;
      await sock.sendMessage(from, { text: `🧠 ${mention(sender)}'s IQ is *${iq}*!`, mentions: [sender] });
      break;

    case '.facts':
      const fact = facts[Math.floor(Math.random() * facts.length)];
      await sock.sendMessage(from, { text: `🧾 *Random Fact:*\n${fact}` });
      break;

    case '.networth':
      const money = Math.floor(Math.random() * 1_000_000) + 1000;
      await sock.sendMessage(from, { text: `💰 ${mention(sender)}'s net worth is *$${money.toLocaleString()}*`, mentions: [sender] });
      break;

    case '.redpill':
      await sock.sendMessage(from, {
        text: `🔴 *Red Pill Chosen*\nYou see the truth. You're now a god in this simulation.`
      });
      break;

    case '.bluepill':
      await sock.sendMessage(from, {
        text: `🔵 *Blue Pill Taken*\nYou return to ignorance. Sweet dreams, soldier.`
      });
      break;
  }
}

module.exports = { commands, run };