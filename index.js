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
        const goals = {
          goal0: "Our Journey Begins",
          goal1: "Minigames",
          goal2: "Bug Catching",
          goal3: "Expanded Museum",
          goal4: "NPC Seasonal Outfit",
          goal5: "Console & Switch Port",
          goal6: "Merfolk Underwater Village",
          goal7: "Kids Grow Up",
          goal8: "Mod Support",
          goal9: "Multiplayer"
        }

        const pledged = parseFloat(body.project.pledged)
        let nextGoal, achievedGoal = ""

        if (pledged >= 70000) {
          achievedGoal = goals.goal0
          nextGoal = goals.goal1
        }
        if (pledged >= 125000) {
          achievedGoal = goals.goal1
          nextGoal = goals.goal2
        }
        if (pledged >= 175000) {
          achievedGoal = goals.goal2
          nextGoal = goals.goal3
        }
        if (pledged >= 200000) {
          achievedGoal = goals.goal3
          nextGoal = goals.goal4
        }
        if (pledged >= 250000) {
          achievedGoal = goals.goal4
          nextGoal = goals.goal5
        }
        if (pledged >= 300000) {
          achievedGoal = goals.goal5
          nextGoal = goals.goal6
        }
        if (pledged >= 350000) {
          achievedGoal = goals.goal6
          nextGoal = goals.goal7
        }
        if (pledged >= 400000) {
          achievedGoal = goals.goal7
          nextGoal = goals.goal8
        }
        if (pledged >= 500000) {
          achievedGoal = goals.goal8
          nextGoal = goals.goal9
        }

        msg.channel.send(`Coral Island Kickstarter Status`)
        msg.channel.send(`Status : ${body.project.state}`)
        msg.channel.send(`Total Pledge : US$${body.project.pledged}`)
        msg.channel.send(`Total Backers : ${body.project.backers_count}`)
        msg.channel.send(`Achieved Stretch Goal : ${achievedGoal}`)
        msg.channel.send(`Next Stretch Goal : ${nextGoal}`)

      });
  }
});
