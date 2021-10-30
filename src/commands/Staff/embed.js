const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Embed extends Command {
  constructor(...args) {
    super({
      description: "Remplace votre message par un message en embed plus esthétique [Staff only]",
      usage: ["w/embed <couleur> <titre> <channel> <description>"],
      examples: ["w/embed RED Annonce! #「🚨」annonces Bonjour à tous, ceci est une annonce spéciale !"],
      cooldown: 1000,
      aliases: [""],
      guildOnly: true,
      enabled: true,
      userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
      args: [
        {
          key: 'couleur',
          required: true
        },
        {
          key: 'titre',
          required: true
        },
        {
          key: 'channel',
          required: true
        },
        {
          key: 'description',
          required: true
        },
      ]
    }, ...args);
  }

  async execute(message, args) {

    const ChannelEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(
      "Le channel que vous avez indiqué n'est pas valide ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
    )
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTimestamp()
    .setFooter("WalibiBot", message.guild.iconURL());

    let ch = message.guild.channels.cache.find(channel => channel.id === args.channel.replace("<#", "").replace(">", ""));
    if (!ch) return message.reply({embeds: [ChannelEmbed]})
    let things = message.content.trim().split(/ +/g);
    const embedchat = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(args.couleur.toString())
      .setTitle(args.titre.toString())
      .setDescription(`${things.slice(4).join(" ")}`)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());
    const doneEmbed = new Discord.MessageEmbed()
      .setTitle(":package: EMBED")
      .setColor("NAVY")
      .setDescription(
        "Action effectuée avec succés ✅\nL'embed a été envoyé avec succès dans le channel " + args.channel)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL());
    message.reply({ embeds: [doneEmbed] })

   
    ch.send({ embeds: [embedchat] })
  }
};
module.exports = Embed
