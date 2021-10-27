const Discord = require("discord.js");
const moment = require("moment");
const Command = require('../../structures/Command');

class User extends Command {
  constructor(...args) {
    super({
      description: "Affiche les informations importantes du compte de l'utilisateur mentionné.",
      usage: ["user [@mention || username || tag || ID]"],
      examples: ['w/user @Rakox', 'w/user Rakox', 'w/user Rakox#6769', 'w/user 490461455741747200'],
      cooldown: 1000,
      aliases: ["userinfo", "user_info", "user-info"],
      guildOnly: true,
      enabled: true,
      args: [
        {
          key: 'user',
          type: 'User'
        }
      ]
    }, ...args);
  }

  async execute(message, args) {


    //Déclarations des const et des valeurs de l'embed
    moment.locale("FR");
    const user = args.user || message.author;
    const member = message.guild.members.cache.get(user);

    /*
    var UserGame;
    if (member.presence.activities) {
      UserGame = member.presence.activities;
    } else if (!member.presence.activities) {
      UserGame = "Aucun jeu détecté";
    }
    */

    let UserType;
    if (member.user.bot) {
      UserType = "Bot"
    } else {
      UserType = "Utilisateur"
    }

    const UserActivity = member.presence.status.replace("dnd", "Ne pas déranger <:DND_Status:754411786236854282>").replace("online", "En ligne <:Online_Status:754411785821356033>").replace("idle", "Inactif <:Idle_Status:754411786308157583>").replace("offline", "Hors ligne <:Offline_Status:754411786316283974>")
    const dateCreation = moment(user.createdAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
    const dateJoin = moment(member.joinedAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
    const UserNick = message.guild.members.get(member.id).displayName
    const HighestRole = message.guild.members.get(member.id).highestRole
    const AllRoles = "<@&" + message.guild.member(member)._roles.join('> \n<@&') + ">"

    //Chargement de l'embed
    const Stats = new Discord.RichEmbed()
      .setTitle(":man_detective: USER-INFO")
      .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.substring(0, 2) === 'a_' ? 'gif' : 'png'}?size=2048}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setColor("17ace8")
      .setDescription(user.tag)
      .addField("ID de l'utilisateur :", user.id)
      .addField("Type de compte :", UserType)
      .addField("Nickname : ", UserNick)
      .addField("Statut actuel :", UserActivity)
      //.addField("Jeu et/ou activités actuels :", UserGame)
      .addField("Compte crée le :", dateCreation)
      .addField("A rejoint le serveur le :", dateJoin)
      .addField("Tout les rôles :", AllRoles)
      .addField("Rôle le plus haut :", HighestRole)
    //.addField("Position sur la liste des joins", position)

    //Envoi du message
    message.reply({embeds : [Stats]});
  }
}
module.exports = User

