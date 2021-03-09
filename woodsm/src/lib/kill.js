const Discord = require('discord.js');
const client = new Discord.Client();
const {passCode} = require('../properties.json');
module.exports = {
  name: 'kill',
  description: 'Kill the bot',
  execute(message, args) {
    // hide kill command
    message
      .delete()
      .then((msg) =>
        console.log(`Deleted KILL message from ${msg.author.username}`)
      )
      .catch(console.error);
    if (args == passCode) {
      console.log(
        'passCode is correct the KILL command is being executed ... '
      );
      // stop discord.js
      client.destroy();
      // stop node proc
      process.exit(0);
    }
  },
};
