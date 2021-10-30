
const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Staff extends Command {
  constructor(...args) {
    super({
      description: "Affiche la liste complète et détailée des membres du staff",
      usage: ["w/staff"],
      examples: ["w/staff"],
      cooldown: 1000,
      aliases: ["team", "teams"],
      guildOnly: true,
      enabled: true,
    }, ...args);
  }
  async execute(message, args) {

    function getAllPlayers(ID){
      return  message.guild.roles.cache.get(ID).members.size > 0? '\n- '+ message.guild.roles.cache.get(ID).members.map(m=>m.user).join('\n- ') : "\n*- En recrutement, pour plus d'infos :* <#583770845332373537>";
    }

    const StaffEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setColor("17ace8")
      .setTitle(":cop: STAFF")
      .setDescription(`**Liste complète de l'équipe de WalibiCraft, pour vous servir.** 
      \n*(Aucun staff ne reçois de ping quand celui-ci est dans un embed, rassurez vous)*\n
      **:crown: Administration :
      **\n<@&583759314527715331>` + getAllPlayers("583759314527715331")
      + `\n<@&617300068801970176>` + getAllPlayers("617300068801970176")
      + `\n\n**:construction_site: Pôle Build :**`
      + `\n<@&716641125309481002>` + getAllPlayers("716641125309481002")
      + `\n<@&723909663481004052>` + getAllPlayers("723909663481004052")
      + `\n\n**:computer: Pôle Développement :**`
      + `\n<@&589108231461273600>` + getAllPlayers("589108231461273600")
      + `\n<@&903781797148639232>` + getAllPlayers("903781797148639232")
      + `\n\n**:wrench: Pôle Technique :**`
      + `\n<@&722845688936923156>` + getAllPlayers("722845688936923156")
      + `\n<@&605095409810931742>` + getAllPlayers("605095409810931742")
      + `\n\n**:scales: Pôle Modération :**`
      + `\n<@&583759864535318550>` + getAllPlayers("583759864535318550")
      + `\n<@&583760442216808474>` + getAllPlayers("583760442216808474")
      + `\n\n**:mega: Pôle Animation & Communication :**`
      + `\n<@&820355025711661097>` + getAllPlayers("820355025711661097")
      + `\n<@&612657315430006784>` + getAllPlayers("612657315430006784")
      + `\n<@&903808547446456340>` + getAllPlayers("903808547446456340")
      + `\n\n**:package: Pôle Modélisation :**`
      + `\n<@&876143126379651142>` + getAllPlayers("876143126379651142")
      + `\n<@&753294418957697144>` + getAllPlayers("753294418957697144")
      + `\n\n**:muscle: Bénévoles :**`
      + `\n<@&772206661595168789>` + getAllPlayers("772206661595168789")
      );

    message.reply({embeds: [StaffEmbed]});
  }
};
module.exports = Staff