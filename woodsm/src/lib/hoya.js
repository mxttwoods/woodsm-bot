module.exports = {
  name: 'hoya',
  description: 'Reply with a hoya!',
  execute(message) {
    message.react('😄');
    message.reply('Hoooyyyaaa!!!');
  },
};
