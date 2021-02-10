const fetch = require('node-fetch');
const Discord = require('discord.js');
const bot = new Discord.Client();

require('dotenv').config();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'cihelp' || msg.content === 'Cihelp' || msg.content === 'ci help' || msg.content === 'Ci help') {
    msg.channel.send(`COMMAND LIST
ci social : Social Media of Coral Island Information
ci ks : Coral Island's Kickstarter Status
    `)
  }

  if (msg.content === 'cisocial' || msg.content === 'Cisocial' || msg.content === 'ci social' || msg.content === 'Ci social') {
    msg.channel.send(`Follow Us On
Steam : https://store.steampowered.com/app/1158160/Coral_Island/
Twitter : https://twitter.com/coralislandgame
Reddit : https://www.reddit.com/r/coralisland/`)
  }

  if (msg.content === 'ci ks' || msg.content === 'Ci ks' || msg.content === 'CI KS') {
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
        let nextGoalAmmount, nextGoal, achievedGoal

        if (pledged >= 70000) {
          nextGoalAmmount = 125000
          achievedGoal = goals.goal0
          nextGoal = goals.goal1
        }
        if (pledged >= 125000) {
          nextGoalAmmount = 175000
          achievedGoal = goals.goal1
          nextGoal = goals.goal2
        }
        if (pledged >= 175000) {
          nextGoalAmmount = 200000
          achievedGoal = goals.goal2
          nextGoal = goals.goal3
        }
        if (pledged >= 200000) {
          nextGoalAmmount = 250000
          achievedGoal = goals.goal3
          nextGoal = goals.goal4
        }
        if (pledged >= 250000) {
          nextGoalAmmount = 300000
          achievedGoal = goals.goal4
          nextGoal = goals.goal5
        }
        if (pledged >= 300000) {
          nextGoalAmmount = 35000
          achievedGoal = goals.goal5
          nextGoal = goals.goal6
        }
        if (pledged >= 350000) {
          nextGoalAmmount = 400000
          achievedGoal = goals.goal6
          nextGoal = goals.goal7
        }
        if (pledged >= 400000) {
          nextGoalAmmount = 500000
          achievedGoal = goals.goal7
          nextGoal = goals.goal8
        }
        if (pledged >= 500000) {
          nextGoalAmmount = 600000
          achievedGoal = goals.goal8
          nextGoal = goals.goal9
        }
        if (pledged >= 600000) {
          achievedGoal = goals.goal9
          nextGoal = "All stretch goal completed"
        }

        msg.channel.send(`Coral Island Kickstarter Status
Status : ${body.project.state}
Total Pledge : US$${pledged}
Total Backers : ${body.project.backers_count}
Previous Achieved Stretch Goal : ${achievedGoal}
Next Stretch Goal : ${nextGoal} ($${nextGoalAmmount})`)
      });
  }
});
