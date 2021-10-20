const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "help",
  aliases: ["h", "list"],
  category: "info",
  description: "Afficher la liste des commandes du bot",
  usage: "w/help",
  statut: "on",
  run: async (client, message, args) => {
    const HelpEmbed = new RichEmbed()
      .setColor("17ace8")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle(":handshake: HELP")
      .setDescription(
        "Voici les commandes de WalibiBot 🤖 \nBesoin d'aide sur une commande spécifique ? `w/info <Commande>`"
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL)
      .addField("📋 **Préfix :**", "`w/`")
      .addField(
        "📎 **Utilitaire :**",
        "`help`, `ticket`, `ping`, `info`, `staff`, `suggestion`, `bvn`, `user-info`, `ip`, `skin`"
      )
      .addField(
        "👮 **Staff :**",
        "`edit`, `prefix`, `prefixreset`, `say`, `embed`, `spam`, `dm`, `partner`"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL);

    message.author.send(HelpEmbed);

    let chathelp = new RichEmbed()
      .setTitle(":handshake: HELP")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17ace8")
      .setDescription("La liste des commandes vous a été envoyée en MP")
      .setFooter("WalibiBot", message.guild.iconURL)
      .setTimestamp();

    message.channel.send(chathelp);
  }
};