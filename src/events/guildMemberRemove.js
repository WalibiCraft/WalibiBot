const Event = require('../structures/Event');

class GuildMemberAdd extends Event {
    // eslint-disable-next-line no-useless-constructor
    constructor(...args) {
        super(...args);
    }
    async execute() {
        //Statistiques
        let statistiques = {
            serveurID: "583756963586768897",
            memberCountID: "722842725178933249"
        };
        if (member.guild.id == statistiques.serveurID) {
            //Actualisation du compteur
            client.channels
                .get(statistiques.memberCountID)
                .setName("「👥」Membres : " + member.guild.memberCount);

            //Message de logs
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

            client.channels.get(`633748338310643722`).send(WelcomeLogEmbed)
        }
    }
}

module.exports = GuildMemberAdd;
