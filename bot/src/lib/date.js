const today = `${new Date().toDateString()}`
module.exports = {
  name: 'date',
  description: 'Reply with the date',
  execute (message) {
    message.reply(`The time is ${today}`)
  }
}
