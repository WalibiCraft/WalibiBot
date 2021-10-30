const Discord = require("discord.js");

const Command = require('../../structures/Command');

class Say extends Command {
  constructor(...args) {
    super({
      description: "Répète le message indiqué dans le channel indiqué [Staff only]",
      usage: ["w/say <channel> <message>"],
      examples: ["w/say 「📌」informations Bonjour à tous !", "w/say「🌐」général Je vous observe :eyes:"],
      cooldown: 1000,
      aliases: ["repeat", "dis", "répète"],
      guildOnly: true,
      enabled: true,
      userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
      args: [
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
    const ChannelEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Le channel que vous avez indiqué n'est pas valide ❌\nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());

    let ch = message.guild.channels.cache.find(channel => channel.id === args.channel.replace("<#", "").replace(">", ""));
    if (!ch) return message.reply({ embeds: [ChannelEmbed] })
    let things = message.content.trim().split(/ +/g);
    let botmessage = things.slice(2).join(" ")
    message.delete();
    ch.send(botmessage);
  }
}
module.exports = Say

