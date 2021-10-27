  
const Discord = require("discord.js");

module.exports = {
  name: "staff",
  aliases: ["team", "teams"],
  category: "info",
  description: "Affiche la liste complète et détailée des membres du staff",
  usage: "w/staff",
  statut: "on",
  run: async (client, message, args) => {
    const StaffEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setColor("17ace8")
      .setTitle(":cop: STAFF")
      .setDescription(`**Liste complète de l'équipe de WalibiCraft, pour vous servir.** \n*(Aucun staff ne reçois de ping quand celui-ci est dans un embed, rassurez vous)*\n\n**:crown: Administration :**\n<@&583759314527715331>\n- <@561608587143806989>\n<@&617300068801970176>\n- <@437342188439863296>\n\n**:construction_site: Pôle Build :**\n<@&723909663481004052>\n- <@275226646649241601>\n\n**:computer: Pôle Développement :**\n<@&589108231461273600>\n- <@490461455741747200>\n\n**:wrench: Pôle Technique :**\n<@&722845688936923156>\n- <@437979906912026626>\n<@&605095409810931742>\n- *En recrutement*\n\n **:scales: Pôle Modération :**\n<@&583759864535318550>\n- <@457275250162401291>\n<@&583760442216808474>\n- *En recrutement*\n<@&612657315430006784>\n- *En recrutement*\n\n**:mega: Pôle Communication :**\n<@&751540352359334029>\n- <@441284809856122891>\n\n**:package: Pôle Modélisation :**\n<@&753294418957697144>\n- *En recrutement*`);

    message.channel.send(StaffEmbed);
  }
};