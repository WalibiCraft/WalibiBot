const Discord = require("discord.js");
const moment = require("moment");
const Command = require('../../structures/Command');
class User extends Command {
  constructor(...args) {
    super({
      description: "Affiche les informations importantes du compte de l'utilisateur mentionné.",
      usage: ["w/user [@mention || username || tag || ID]"],
      examples: ['w/user @Rakox', 'w/user Rakox', 'w/user Rakox#6769', 'w/user 490461455741747200'],
      cooldown: 1000,
      aliases: ["userinfo", "user_info", "user-info"],
      guildOnly: true,
      enabled: true,
      args: [
        {
          key: 'user',
          type: 'User',
          //required: false,
        }
      ]
    }, ...args);
  }

  async execute(message, args) {

    //Déclarations des const et des valeurs de l'embed
    moment.locale("FR");
    const user = args.user || message.author;
    const member = message.guild.members.cache.get(user.id);
    const userType = user.bot ? "Bot" : "Utilisateur"
    const userStatus = member.presence.activities[0] && member.presence && member.presence.activities[0].state ? member.presence.activities[0].state : "Aucun jeu détecté";
    const userGame =  member.presence.activities[1] && member.presence && member.presence.activities[1].name ? member.presence.activities[1].name : "Aucun statut détecté";
    const userOnline = member.presence && member.presence.status ? member.presence.status.toString().replace("dnd", "Ne pas déranger <:DND_Status:754411786236854282>").replace("online", "En ligne <:Online_Status:754411785821356033>").replace("idle", "Inactif <:Idle_Status:754411786308157583>").replace("offline", "Hors ligne <:Offline_Status:754411786316283974>"): "Hors ligne <:Offline_Status:754411786316283974>";
    const dateCreation = user ? moment(user.createdAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche") : "Aucune date trouvée";
    const dateJoin = moment(member.joinedAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
    const getDisplayName = member.displayName != user.username ? member.displayName : "Aucun nick";
    const highestRole = member.roles.highest.toString();
    const allRoles = member ? (member.roles.cache.map(r => `${r}`).join('\n').toString()) : "Aucun rôle détecté";
    const flags = user.flags || await user.fetchFlags();
    const userFlags = flags.toArray().join('\n')
    const members = [...message.guild.members.cache.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).values()]
    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if(members[i - 1].id == user.id) ful(i)
      }
    })

    //Chargement de l'embed
    const Stats = new Discord.MessageEmbed()
      .setTitle(":man_detective: USER-INFO")
      .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.substring(0, 2) === 'a_' ? 'gif' : 'png'}?size=2048}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setColor("17ace8")
      .setDescription(user.tag)
      .addField("ID de l'utilisateur :", user.id, true)
      .addField("Type de compte :", userType, true)
      .addField("Nickname : ", getDisplayName, true)
      .addField("État actuel :", userOnline, true)
      .addField("Statut actuel :", userStatus, true)
      .addField("Activité actuelle :", userGame, true)
      .addField("Compte crée le :", dateCreation, true)
      .addField("A rejoint le serveur le :", dateJoin, true)
      .addField("Rôle le plus haut :", highestRole, true)
      .addField("Tout les rôles :", allRoles, true)
      .addField("Position sur la liste des arrivées", `${await position}`, true)
      .addField("Badges :", userFlags ? userFlags : "Aucun badge détecté", true)

    //Envoi du message
    message.reply({embeds : [Stats]});
  }
}
module.exports = User

