const Command = require('../../structures/Command');
class Info extends Command {
  constructor(...args) {
    super({
      enabled: false,
      description: "Affiche les informations importantes de WalibiCraft",
      usage: "w/about",
      examples: [""],
      cooldown: 1000,
      aliases: ["site", "walibicraft", "wc", "server", "infoserveur", "about"],
      guildOnly: true,
      args: [
        {
        }
      ]
    }, ...args);
  }

  async execute(message, args) {
    const AboutEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setColor("17ace8")
      .setTitle(":pushpin: INFO")
      .setFooter("WalibiBot", message.guild.iconURL())
      .setDescription("Information du serveur **WalibiCraft**")
      .addField("IP :", "*Non disponible*")
      .addField("Version :", "*Non disponible*")
      .addField("Crack :", "**Non accepté**")
      .addField("Site internet :", "*Non disponible*")
      .addField("Réseaux sociaux :", "*Non disponible*")

    message.channel.send(AboutEmbed);
  }
};
module.exports = Info;
