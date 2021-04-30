module.exports = {
  name: 'user',
  description: 'Reply with information the about the author.',
  execute (message) {
    message.reply(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    )
  }
}
