const Discord = require("discord.js");

module.exports = {
  name: "about",
  aliases: ["site", "walibicraft","wc","server"],
  category: "info",
  description: "Affiche les informations importantes de WalibiCraft",
  usage: "w/about",
  statut: "off",
  run: async (client, message, args) => {
    const AboutEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setColor("17ace8")
      .setTitle(":pushpin: ABOUT")
      .setFooter("WalibiBot", message.guild.iconURL)
      .setDescription("EN DÉVELOPPEMENT :hourglass_flowing_sand:")
    message.channel.send(AboutEmbed);
  }
};