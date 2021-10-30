const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Spam extends Command {
  constructor(...args) {
    super({
      description: "Commande un peu cancer, mais ça réveille bien ! [Staff only]",
      usage: ["w/spam <nombre> <channel> <message>"],
      examples: ["w/spam "],
      cooldown: 1000,
      aliases: ["debout"],
      guildOnly: true,
      enabled: true,
      userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
      args: [
        {
          key: "number",
          required: true,
        },
        {
          key: "channel",
          required: true,
        },
        {
          key: "string",
          required: true,
        },
      ]
    }, ...args);
  }

  async execute(message, args) {

    const SpamEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer le nombre de fois que le message va être envoyé ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());

      const ChannelEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Le channel que vous avez indiqué n'est pas valide ❌\nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());

    if (isNaN(args.number)) return message.reply({embeds: [SpamEmbed]});
    let ch = message.guild.channels.cache.find(channel => channel.id === args.channel.replace("<#", "").replace(">", ""));
    if (!ch) return message.reply({ embeds: [ChannelEmbed] })
    let things = message.content.trim().split(/ +/g);
    let botmessage = things.slice(3).join(" ");
    let nb = parseInt(args.number);
    message.delete();

    for (var i = 0; i < nb; i++) {
      ch.send(botmessage);
    }
  }
};
module.exports = Spam;