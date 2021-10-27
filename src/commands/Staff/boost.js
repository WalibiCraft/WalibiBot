const Discord = require("discord.js");

module.exports = {
    name: "boost",
    category: "Staff",
    description: "Affiche un embed spécial pour rémercier un boost de serveur [Staff Only]",
    usage: "w/boost <@user>",
    statut: "on",
    run: async (client, message, args) => {
        //Déclaration des Embed
        const PermEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous n'avez pas l'autorisation de faire ça, bien tenté ! :x:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const MentionEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez mentionner un utilisateur ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        //Vérifications classiques
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.channel.send(PermEmbed).then(msg => {
                msg.delete(15000);
            })
        }

        let booster = message.mentions.users.first()
        if (!booster) {
            message.delete();
            message.channel.send(MentionEmbed).then(msg => {
                msg.delete(15000);
            })
        }

        //Embed de boost
        const BoostEmbed = new Discord.RichEmbed()
            .setTitle("<a:Boosting:661258026614915073> BOOST")
            .setColor("ff66e2")
            .setDescription(
                booster +
                " viens de booster le serveur ! Merci à lui <a:Pepe_NitroBoost:635137208474664961>"
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setImage(
                "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
            );
        message.delete();
        client.channels.get("722838096000974909").send(BoostEmbed);
    }
};
