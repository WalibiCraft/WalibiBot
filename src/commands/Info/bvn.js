const Discord = require("discord.js");

module.exports = {
  name: "bvn",
  aliases: ["welcome", "bienvenue"],
  category: "Info",
  description:
    "Affiche un message de bienvenue aux nouveaux arrivants (:warning: Attention ne fonctionne qu'en <#722838096000974909>)",
  usage: "w/bvn",
  statut: "on",
  run: async (client, message, args) => {

    //Vérification du channnel
    if (message.channel.id === "722838096000974909") {
      //Envoi du message
      const welcome = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(message.author + " vous souhaite la bienvenue ! <a:Welcome1:635137207736336384><a:Welcome2:635137207614570516>")
        .setTitle(":wave: BIENVENUE")
        .setColor("17ace8")
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL);
      message.channel.send(welcome);
      message.delete();
    } else {
      //Message d'erreur
      const errorembed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Vous faites cette commande de le mauvais channel :x:\nIl faut te rendre dans le channel <#722838096000974909> pour éxécuter celle-ci ✅"
        )
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL);

      message.channel.send(errorembed).then(msg => {
        msg.delete(15000);
      });
    }
  }
};