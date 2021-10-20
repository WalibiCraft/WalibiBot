const Discord = require("discord.js");

module.exports = {
  name: "suggestion",
  aliases: ["suggest","idea"],
  category: "info",
  description:
    "Met votre suggestion en embed et la poste dans le channel <#606836989458776074> afin d'apporter une idée de nouveauté sur le serveur",
  usage: "w/suggestion <idée>",
  statut: "on",
  run: async (client, message, args) => {
    let things = message.content.trim().split(/ +/g);
    let suggest = things.slice(1).join(" ")
 
     const SayEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer une suggestion :x:\nPlus d'informations avec la commande `e/info <Commande>` :bulb:"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);
       if (!suggest) return message.channel.send(SayEmbed)
    
    let suggestionembedchat = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor("17ace8")
      .setTitle(":heart: SUGGESTION")
      .setDescription(
        `${suggest}\n\n*Idée proposée par ${
          message.author
        }, merci a lui !*`
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);
    message.delete();

    client.channels
      .get("722840520090714163")
      .send(suggestionembedchat)
      .then(function(message) {
        message.react("❌");
        message.react("✅");
      });
  }
};