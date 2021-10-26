const Command = require('../../structures/Command');
class Suggestion extends Command {
  constructor(...args) {
    super({
      description: "Poste votre idée mise en forme dans le channel, <#606836989458776074> afin que votre propositions soit examinée par tout le serveur",
      usage: "e/suggest <proposition>",
      examples: ["e/suggest Mettre en place un nouveau grade", "e/suggest Améliorer l'attraction n°1"],
      cooldown: 1000,
      aliases: ["suggest","idea"],
      guildOnly: true,
    }, ...args);
  }

  async execute(message, args) {
    const things = message.content.trim().split(/ +/g);
    const suggest = things.slice(1).join(" ")

    const SayEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez indiquer une suggestion :x:\nPlus d'informations avec la commande `w/help <Commande>` :bulb:"
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());
    if (!suggest) return message.channel.send(SayEmbed)

    const suggestionembedchat = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("17ace8")
      .setTitle(":heart: SUGGESTION")
      .setDescription(
        `${suggest}\n\n*Idée proposée par ${message.author
        }, merci a lui !*`
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());
    message.delete();

    client.channels.cache
      .get("751501134623014993")
      .send(suggestionembedchat)
      .then(function (message) {
        message.react("❌");
        message.react("✅");
      });
  }
};
module.exports = Suggestion;