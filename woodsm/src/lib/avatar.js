module.exports = {
  name: 'avatar',
  description: 'Reply with the avatar of the author of with all users in args.',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply(
        `Your avatar: ${message.author.displayAvatarURL({
          dynamic: true,
        })}`
      );
    }
    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({
        dynamic: true,
      })}`;
    });
    message.reply(avatarList);
  },
};
