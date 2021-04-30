// import client library
const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Reply with help information.',
  execute (message) {
    // inside a command, event listener, etc.
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('WoodsM-Bot Help')
      .setURL('https://bot.woods.engineering/')
      .setAuthor(
        'Woods Engineering',
        'https://img.icons8.com/fluent/48/000000/about.png',
        'https://matthew.codes'
      )
      // .setDescription('WoodsM-Bot Documentation')
      .setThumbnail('https://icons8.com/icon/DEh29EAslzc0/motherboard')
      // .addFields(
      //   {name: 'Regular field title', value: 'Some value here'},
      //   {name: '\u200B', value: '\u200B'},
      //   {name: 'Inline field title', value: 'Some value here', inline: true},
      //   {name: 'Inline field title', value: 'Some value here', inline: true},
      // )
      // .addField('Inline field title', 'Some value here', true)
      .addFields({
        name: 'Get help and read all available commands here',
        value: 'https://bot.wooods.engineering/'
      })
      // .setImage('https://img.icons8.com/fluent/48/000000/motherboard.png')
      .setTimestamp()
      .setFooter(
        'Woods Engineering',
        'https://img.icons8.com/fluent/48/000000/settings.png'
      )
    message.reply(helpEmbed)
    message.react('🚀')
  }
}
