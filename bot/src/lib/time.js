const timeStamp = `${new Date().toLocaleTimeString()}`
module.exports = {
  name: 'time',
  description: 'Reply with the time',
  execute (message) {
    message.reply(`The time is ${timeStamp}`)
  }
}
