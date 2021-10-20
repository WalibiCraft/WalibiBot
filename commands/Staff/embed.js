const Discord = require("discord.js");

module.exports = {
  name: "embed",
  category: "staff",
  description:
    "Remplace votre message par un message en embed plus esthétique [Staff only]",
  usage: "w/embed <couleur> <titre> <channel> <description>",
  statut: "on",
  run: async (client, message, args) => {
    const PermEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous n'avez pas l'autorisation de faire ça, bien tenté ! ❌"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    const MessageEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez entre un message a transformer en embed ❌ \nPlus d'information avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    let color = "\"" + args[0] + "\"" 
    let title = "\"" + args[0] + "\"" 
    let things = message.content.trim().split(/ +/g);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    if (!args[0]) return message.channel.send(MessageEmbed);
    let embedchat = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setColor(args[0])
      .setTitle(args[1])
      .setDescription(`${things.slice(3).join(" ")}`)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);
    message.delete();

    message.channel.send(embedchat);
  }
};