const Discord = require('discord.js');
const Command = require('../../structures/Command');

class Bvn extends Command {
  constructor(...args) {
    super({
      description: "Affiche un message de bienvenue aux nouveaux arrivants (:warning: Attention ne fonctionne que dans le channel「👋」bienvenue)",
      usage: ["w/bvn"],
      examples: ["w/bvn"],
      cooldown: 1000,
      aliases: ["welcome", "bienvenue"],
      guildOnly: true,
      enabled: true,
    }, ...args);
  }

  async execute(message, args) {
    //Vérification du channnel
    if (message.channel.id === "722838096000974909") {
      //Envoi du message
      const welcome = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(message.author.toString() + " vous souhaite la bienvenue ! <a:Welcome1:635137207736336384><a:Welcome2:635137207614570516>")
        .setTitle(":wave: BIENVENUE")
        .setColor("17ace8")
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());
      message.channel.send({ embeds: [welcome] });
      message.delete();
    } else {
      //Message d'erreur
      const errorembed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(
          "Vous faites cette commande de le mauvais channel :x:\nIl faut te rendre dans le channel <#722838096000974909> pour éxécuter celle-ci ✅"
        )
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      message.reply({ embeds: [errorembed] })
    }
  }
};
module.exports = Bvn
