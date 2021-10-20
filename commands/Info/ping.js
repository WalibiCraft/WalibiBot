
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p", "latency", "latence"],
  category: "info",
  description: "Connaître la latence de l'API et du bot",
  usage: "w/ping",
  statut: "on",
  run: async (client, message, args) => {
    const m = await message.channel.send("**Calcul du ping en cours...**");

    const PingEmbed = new Discord.RichEmbed()
      .setColor("17ace8")
      .setTitle("🏓 PING")
      .setDescription(
        `Pong ! Lantence du bot : **${m.createdTimestamp -
          message.createdTimestamp}ms**. \nLatence de l'API Discord : **${Math.round(
          client.ping
        )}ms**`
      )
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setFooter("WalibiBot", message.guild.iconURL);

    m.edit(PingEmbed);
  }
};