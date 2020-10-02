const Command = require('../../structures/Command');

class Avatar extends Command {
  constructor(...args) {
    super({
      description: 'Returns the profile image of a player.\n> Targeting by mention, username, tag or ID.',
      usage: 'avatar {@mention || username || tag || ID}',
      examples: ['@Rakox', 'Rakox', 'Rakox#6769', '490461455741747200'],
      cooldown: 1000,
      aliases: ['👤', 'picture'],
      guildOnly: true,
      args: [
        {
          key: 'user',
          type: 'User'
        }
      ]
    }, ...args);
  }

  async execute(message, args) {
    const user = args.user || message.author;

    return message.channel.send({
      embed: {
        description: message.author.id === user.id ? `**This is your avatar, <@${user.id}>**` : `**This is the profile picture of <@${user.id}>**`,
        image: {
          url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.substring(0, 2) === 'a_' ? 'gif' : 'png'}?size=2048}`
        }
      }
    });
  }
}

module.exports = Avatar;
