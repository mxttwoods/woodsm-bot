const replies = ['yerrrrr', 'ykwtfgo!', 'fbgm', 'hoooyyyaaa'];

module.exports = {
  name: 'random',
  description: 'Reply with random slang.',
  execute(message, args) {
    const index = Math.floor(Math.random() * replies.length);
    message.reply(replies[index]);
  },
};
