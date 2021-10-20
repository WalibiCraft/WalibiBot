const Discord = require("discord.js");

module.exports = {
  name: "ip",
  aliases: ["version", "crack", "adresseip"],
  category: "info",
  description: "Connaître les informations nécéssaires à la connexion du serveur Minecraft",
  usage: "w/ping",
  statut: "on",
   run: async (client, message, args) => {
    const IpEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setColor("17ace8")
      .setTitle("⛓️ SE CONNECTER")
      .setFooter("WalibiBot", message.guild.iconURL)
      .setDescription("\n**Statut des serveurs :** `[En développement]` \n**IP :** `[En développement]` \n**Version :** `1.15.2` \n**Crack :** `OFF`")
    message.channel.send(IpEmbed);
  }
};