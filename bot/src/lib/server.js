module.exports = {
  name: 'server',
  description: 'Reply with info about this server.',
  execute (message) {
    message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
  }
}
