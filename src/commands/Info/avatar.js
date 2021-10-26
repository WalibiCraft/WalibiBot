const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

class Avatar extends Command {
  constructor(...args) {
    super({
      description: 'Affiche la photo de profil de l\'utilisateur',
      usage: 'avatar [@mention || username || tag || ID]',
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

    const avatar = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(message.author.toString() + ", voici votre avatar ! Il est bien beau dit donc :smirk:")
      .setTitle("👤 AVATAR")
      .setColor("17ace8")
      .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.substring(0, 2) === 'a_' ? 'gif' : 'png'}?size=2048}`)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);
    message.reply({ embeds: [avatar]});
  }
}

module.exports = Avatar;
