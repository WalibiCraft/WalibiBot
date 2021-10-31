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

            //Message de bienvenue
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

            //Message de log
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

            //Rename automatique
            member.setNickname("[💎] " + member.user.username);

            //Autorole
            member.addRole("664477459231801344");

            //Welcome MP
            const WelcomeMpEmbed = new Discord.RichEmbed()
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

            member.send(WelcomeMpEmbed);
        }
    }
}

module.exports = GuildMemberAdd;
