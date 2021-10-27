const Discord = require('discord.js')
const Command = require('../../structures/Command');

class Suggestion extends Command {
  constructor(...args) {
    super({
      description: "Poste votre idée mise en forme dans le channel「🔥」suggestions afin que votre propositions soit examinée par tout le serveur",
      usage: "w/suggest <proposition>",
      examples: ["w/suggest Mettre en place un nouveau grade", "w/suggest Améliorer l'attraction n°1"],
      cooldown: 1000,
      aliases: ["suggest","idea"],
      guildOnly: true,
    }, ...args);
  }

  async execute(message, client) {
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
    if (!suggest) return message.reply({ embeds: [SayEmbed]})

    const SuggestionEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("17ace8")
      .setTitle(":heart: SUGGESTION")
      .setDescription(
        `${suggest}\n\n**Idée proposée par ${message.author}, merci à lui !**\n Les discussions sont désactivées dans ce channel, \nUtilisez \`「🤖」commandes\` pour proposer votre suggestion avec \`w/suggestion\`\n Ou débattez de cette proposition dans \`「🌐」général\`.`
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());

    message.guild.channels.cache
      .get("722841863429816481")
      .send({embeds: [SuggestionEmbed]})
      .then(function (msg) {
        msg.react("❌");
        msg.react("✅");
      });
    message.delete();
  }
};
module.exports = Suggestion;