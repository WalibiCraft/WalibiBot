//Init Bot
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const fetch = require("node-fetch");
const { config } = require("dotenv");
const { Client, Collection } = require("discord.js");
const client = new Discord.Client();

//Login
client.login('NjA0NjczMTc4Mjc4NTU5NzQ5.XTxXxw.UBlkdnh6mLmQhDi-_pUHDDSj9kY').catch(console.error());

//Init handlers
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//Init Commandes
client.on("message", async message => {
  const prefix = "w/";

  if (message.author.bot) return;
  if (!message.guild) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    if (cmd === "yes") return;
    if (cmd === "no") return;


    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) {
      const ErrorEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(
          "Cette commande n'existe pas ❌ \nListe des commandes obtensible avec la commande `w/help` 💡"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL);

      message.channel.send(ErrorEmbed)
        .then(msg => {
          msg.delete(10000)
        })
        .catch(console.error);
      return;
    };

    //Statut des commandes
    if (!command.statut || command.statut == "on")
      command.run(client, message, args);

    if (command.statut == "staff") {
      if (!message.member.roles.has("583766594027651082"))
        return message.delete();
      console.log(
        `${message.member.user.username} a utilisé la commande ${command.name}`
      );
    };

    if (command.statut == "off") {
      const errorembed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Cette commande est en maintenance :x: \nListe des commandes obtensible avec la commande `w/help` 💡"
        )
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL);
      message.channel.send(errorembed)
    }
});

//Log démarrage
client.on("ready", () => {
  console.log("WalibiBot viens de démarrer avec succès.")
});

//Statut
client.on("ready", () => {
  let status = `w/help | WalibiCraft 🎡`
  client.user.setActivity(status, {
    type: "WATCHING",
  });
});

//Statistiques
const statistiques = {
  serveurID: "583756963586768897",
  memberCountID: "722842725178933249"
};

client.on("guildMemberAdd", member => {
  if (member.guild.id !== statistiques.serveurID) return;

  client.channels
    .get(statistiques.memberCountID)
    .setName("「👥」Membres : " + member.guild.memberCount);
});

client.on("guildMemberRemove", member => {
  if (member.guild.id !== statistiques.serveurID) return;

  client.channels
    .get(statistiques.memberCountID)
    .setName("「👥」Membres : " + member.guild.memberCount);
});

//Message de bienvenue
client.on("guildMemberAdd", member => {
  if (member.guild.id === "583756963586768897") {
  let WelcomeEmbed = new Discord.RichEmbed()
    .setTitle("**👋 NOUVEAU MEMBRE**")
    .setDescription(
      "** " +
      member +
      "** viens de rejoindre notre serveur ! 🥳"
    )
    .addField(
      "Utilisez `w/bvn` pour lui souhaiter la bienvenue",
      "\nNous sommes désormais **" +
      member.guild.memberCount +
      "** 🕺"
    )
    .setTimestamp()
    .setColor("17ace8")
    .setFooter("WalibiBot", member.guild.iconURL);

    client.channels.get(`722838096000974909`).send(WelcomeEmbed);
  }

  moment.locale("FR");
  const dateCreation = moment(member.user.createdAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
  const dateJoin = moment(member.joinedAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")

  let WelcomeLogEmbed = new Discord.RichEmbed()
    .setTitle(`🥳 **Un nouvel utilisateur nous a rejoint !**`)
    .setDescription(`Statistiques de l'utilisateur **${member.user.username}**`
    )
    .addField("ID de l'utilisateur : ", member.id)
    .addField("Compte crée le : ", dateCreation)
    .addField("Date de l'arrivée sur le serveur : ", dateJoin)
    .setTimestamp()
    .setColor("17ace8")
    .setThumbnail(member.user.displayAvatarURL)
    .setFooter("WalibiBot", member.guild.iconURL);

  client.channels.get(`633748338310643722`).send(WelcomeLogEmbed);
});

client.on("guildMemberRemove", member => {
    moment.locale("FR");
    const dateCreation = moment(member.user.createdAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
    const dateLeave = moment().format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
  
    let WelcomeLogEmbed = new Discord.RichEmbed()
      .setTitle(`👋 **Un utilisateur nous a quitté !**`)
      .setDescription(`Statistiques de l'utilisateur **${member.user.username}**`
      )
      .addField("ID de l'utilisateur : ", member.id)
      .addField("Compte crée le : ", dateCreation)
      .addField("Date du départ du serveur : ", dateLeave)
      .setTimestamp()
      .setColor("17ace8")
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter("WalibiBot", member.guild.iconURL);
  
    client.channels.get(`633748338310643722`).send(WelcomeLogEmbed);
  });

//Rename automatique
client.on("guildMemberAdd", member => {
  if (member.guild.id === "583756963586768897") {;
  member.setNickname("[💎] " + member.user.username);
  }
});

//Autorole
client.on("guildMemberAdd", member => {
  if (member.guild.id === "583756963586768897") {;
  member.addRole("664477459231801344");
  }
});

//Welcome MP
client.on("guildMemberAdd", member => {
  if (member.guild.id === "583756963586768897") {
  const WelcomeEmbed = new Discord.RichEmbed()
    .setTitle("👋 Bienvenue sur WalibiCraft !")
    .setColor("17ace8")
    .setDescription(
      "Nous espérons que vous passerez un bon moment sur le serveur. 😄"
    )
    .addField(
      "⚠️ Pour  avoir un accès complet au serveur, n'oubliez pas de valider le règlement",
      "En mettant la réaction ✅ dans le channel prévu à cet effet : <#722838824782397531> !"
    )
    .addField(
      "📨 Un problème, une question, un report ?",
      "Ouvrez un ticket dans <#616994843603763213> avec la commande `w/ticket` pour avoir de l'assistance !"
    )
    /*.addField(
      "😬 Vous vous êtes égarés et voulez revenir parmis nous ?",
      "Utilisez cette invitation pour nous rejoindre à nouveau : https://discord.gg/ABRV6QV"
      )*/
    //.setAuthor(member.tag, member.displayAvatarURL)
    .setTimestamp()
    .setFooter("WalibiBot", member.guild.iconURL)

  member.send(WelcomeEmbed);
    }
});

//Boost
client.on("nitroBoost", booster => {
  const BoostEmbed = new Discord.RichEmbed()
    .setTitle("🥰 BOOST")
    .setColor("ff66e2")
    .setDescription(
      booster +
      " viens de booster le serveur ! Merci à lui 😍"
    )
    .setTimestamp()
    .setFooter("WalibiBot", booster.guild.iconURL)
    .setImage(
      "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
    );
  client.channels.get("583768375608475795").send(BoostEmbed);
});

//Vérification
client.on("ready", () => {
  client.guilds
    .get("583756963586768897")
    .channels.get("722838824782397531")
    .fetchMessage("791695391229476904");
});
client.on("messageReactionAdd", (reaction, user) => {
  let message = reaction.message,
    emoji = reaction.emoji;
  if (emoji == "✅") {
    message.guild.fetchMember(user.id).then(member => {
      member.addRole("583765960897593355");
      member.removeRole("664477459231801344");
    });
  }
}); 

//Connexion channel vocal
client.on("ready", () => {
  const channel = client.channels.get("722842846146592909");
  if (!channel) return console.error("Ce channel n'existe pas !");
  channel.join().catch(e => {
    console.error(e);
  });
});

//Complétment bvn
client.on("message", message => {
  if (message.channel.id === "722838096000974909") {
    if (!message.author.bot)
      if (!message.member.hasPermission("ADMINISTRATOR"))
        if (!message.content.toLowerCase().includes("w/bvn")) {
          message.delete();
          const errorembed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(
              "Vous n'avez pas le droit de discuter dans ce channel :x: \nUtilisez uniquement `w/bvn` pour souhaiter la bienvenue :octagonal_sign:"
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);
          message.channel.send(errorembed).then(msg => {
            msg.delete(15000);
          });
        }
  }
});


//Complétment ticket
client.on("message", message => {
  if (message.channel.id === "616994843603763213") {
    if (!message.author.bot)
      //if (!message.member.roles.has("583766594027651082")) {
      if (!message.content.toLowerCase().includes("w/ticket")) {
        message.delete();
        const errorembed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setDescription(
            "Vous n'avez pas le droit de discuter dans ce channel :x: \nUtilisez uniquement `w/ticket` pour ouvrir un ticket :octagonal_sign:"
          )
          .setTimestamp()
          .setFooter("WalibiBot", message.guild.iconURL);
        message.channel.send(errorembed).then(msg => {
          msg.delete(15000);
        });
      }
  }
});
