module.exports = {
  name: 'date',
  description: 'Reply with the date',
  execute (message) {
    message.reply(`The time is ${new Date().toDateString()}`)
  }
}
