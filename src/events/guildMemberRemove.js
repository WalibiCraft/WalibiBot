const Event = require('../structures/Event');
const moment = require('moment-timezone');
const Discord = require('discord.js')

class GuildMemberRemove extends Event {
    // eslint-disable-next-line no-useless-constructor
    constructor(...args) {
        super(...args);
    }
    async execute(member) {
        const { client } = this;

        //Statistiques
        let statistiques = {
            serveurID: "583756963586768897",
            memberCountID: "722842725178933249"
        };
        if (member.guild.id == statistiques.serveurID) {
            //Actualisation du compteur
            member.guild.channels.cache
                .get(statistiques.memberCountID)
                .setName("「👥」Membres : " + member.guild.memberCount);

            //Message de logs
            moment.locale("FR");
            const dateCreation = moment(member.user.createdAt).format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")
            const dateLeave = moment().format("LLLL").replace("lundi", "Lundi").replace("mardi", "Mardi").replace("mercredi", "Mercredi").replace("jeudi", "Jeudi").replace("vendredi", "Vendredi").replace("samedi", "Samedi").replace("dimanche", "Dimanche")

            let WelcomeLogEmbed = new Discord.MessageEmbed()
                .setTitle(`👋 **Un utilisateur nous a quitté !**`)
                .setDescription(`Statistiques de l'utilisateur **${member.user.username}**`
                )
                .addField("ID de l'utilisateur : ", member.id)
                .addField("Compte crée le : ", dateCreation)
                .addField("Date du départ du serveur : ", dateLeave)
                .setTimestamp()
                .setColor("17ace8")
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter("WalibiBot", member.guild.iconURL());

            member.guild.channels.cache.get(`633748338310643722`).send({ embeds: [WelcomeLogEmbed] })
        }
    }
}

module.exports = GuildMemberRemove;
