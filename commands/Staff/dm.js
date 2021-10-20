const Discord = require("discord.js");

module.exports = {
  name: "dm",
  aliases: ["mp"],
  category: "staff",
  description:
    "Envoie le message indiqué a l'utilisateur mentionné [Staff only]",
  usage: "w/dm <@user> <message>",
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
        "Vous devez indiquer un message à envoyer ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    const MentionEmbed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez mentionner un utilisateur ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(PermEmbed);
    let membre = message.guild.member(message.mentions.users.first());
    if (!membre) return message.channel.send(MentionEmbed);
    let things = message.content.trim().split(/ +/g);
    if (!args[1]) return message.channel.send(SayEmbed);
    const botmessage = things.slice(2).join(" ");
    message.delete().catch();
    membre.send(botmessage);
    const mpembed = new Discord.RichEmbed()
      .setTitle("✉️ DM")
      .setColor("NAVY")
      .setDescription(
        "Action effectuée avec succés ✅\n " +
          membre +
          ' a bien reçu le message "**' +
          botmessage +
          '**" en mp'
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL)
      .setAuthor(message.author.tag, message.author.displayAvatarURL);
    message.channel.send(mpembed);
  }
};