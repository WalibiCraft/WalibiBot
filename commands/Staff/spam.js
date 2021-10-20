const Discord = require("discord.js");

module.exports = {
  name: "spam",
  aliases: ["debout"],
  category: "staff",
  description: "Commande un peu cancer, mais ça réveille bien ! [Staff only]",
  usage: "w/spam <nombre> <message>",
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
        "Vous devez indiquer un message à spammer ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    const SpamEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer le nombre de fois que le message va être envoyé ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    if (isNaN(args[0])) return message.channel.send(SpamEmbed);
    if (!args[1]) return message.channel.send(SayEmbed);
    let botmessage = args.slice(1).join(" ");
    let nb = parseInt(args[0]);
    message.delete();

    for (var i = 0; i < nb; i++) {
      message.channel.send(botmessage);
    }
  }
};