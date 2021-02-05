require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetch = require('node-fetch');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ks-stat') {
    fetch('https://www.kickstarter.com/projects/coralisland/coral-island-reimagining-the-farm-sim-game/stats.json?v=1')
      .then(res => res.json())
      .then(body => {
        msg.channel.send(`Coral Island Kickstarter Status`)
        msg.channel.send(`Total Pledge : US$${body.project.pledged}`)
        msg.channel.send(`Total Backers : ${body.project.backers_count}`)
        msg.channel.send(`Status : ${body.project.state}`)
      });

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});
