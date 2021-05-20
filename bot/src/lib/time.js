module.exports = {
  name: 'time',
  description: 'Reply with the time',
  execute (message) {
    message.reply(`The time is ${new Date().toLocaleTimeString()}`)
  }
}
