const Discord = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["repeat"],
  category: "staff",
  description: "Répète le message indiqué dans le channel indiqué [Staff only]",
  usage: "w/say <#id du channel> <message>",
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

    const SayEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer un message à répéter ❌\nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    const ChannelEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Le channel que vous avez indiqué n'est pas valide ❌\nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    let channel = args[0];
    if (!channel || !args[0]) return message.channel.send(ChannelEmbed);
    if (!args[1]) return message.channel.send(SayEmbed);
    let botmessage = args.slice(1).join(" ");
    message.delete();
    client.channels.get(channel).send(botmessage);
  }
}