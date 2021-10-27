const Discord = require('discord.js');
const Command = require('../../structures/Command');

class Info extends Command {
  constructor(...args) {
    super({
      description: "Affiche les informations importantes de WalibiCraft (site, ip...)",
      usage: ["w/info"],
      examples: ["w/info"],
      cooldown: 1000,
      aliases: ["ip", "site", "walibicraft", "wc", "server", "infoserveur", "about", "version", "crack", "adresseip", "minecraft"],
      guildOnly: true,
      enabled: true,
    }, ...args);
  }

  async execute(message, args) {
    const AboutEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setColor("17ace8")
      .setTitle(":pushpin: INFO")
      .setFooter("WalibiBot", message.guild.iconURL())
      .setDescription("Information du serveur **WalibiCraft** :roller_coaster:")
      .addField("IP :", "*Non disponible*")
      .addField("Version :", "*Non disponible*")
      .addField("Crack :", "**Non accepté**")
      .addField("Site internet :", "*Non disponible*")
      .addField("Réseaux sociaux :", ":video_camera: **Youtube :** https://www.youtube.com/channel/UClUdtB8au33-RLLq-EnFcUQ \n:bird: **Twitter :** https://twitter.com/WalibicraftFR \n:camera_with_flash: **Instagram :** https://www.instagram.com/walibicraft_ra/ \n:link: **Discord :** https://discord.gg/ABRV6QV")

    message.reply({ embeds: [AboutEmbed]});
  }
};
module.exports = Info;
