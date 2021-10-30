const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Dm extends Command {
  constructor(...args) {
    super({
      description: "Envoie le message indiqué à l'utilisateur [Staff only]",
      usage: ["w/dm <@mention || username || tag || ID> <message>"],
      examples: ["w/dm Rakox Tu est le plus beau", "w/dm Méga Tu est le meilleur admin"],
      cooldown: 1000,
      aliases: ["mp", "privatemessage", "talk"],
      guildOnly: true,
      enabled: true,
      userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
      args: [
        {
          key: 'user',
          type: 'User'
        },
        {
          key: 'string',
          required: true
        }
      ]
    }, ...args);
  }

  async execute(message, args) {

    let membre = args.user
    let things = message.content.trim().split(/ +/g);
    const botmessage = things.slice(2).join(" ");
    membre.send(botmessage);
    const mpembed = new Discord.MessageEmbed()
      .setTitle("✉️ DM")
      .setColor("NAVY")
      .setDescription(
        "Action effectuée avec succés ✅\n " +
        membre.toString() +
        ' a bien reçu le message "**' +
        botmessage +
        '**" en mp'
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL());
    message.reply({embeds: [mpembed]});
  }
};
module.exports = Dm