const Discord = require("discord.js");

module.exports = {
    name: "partner",
    aliases: ["partenaire"],
    category: "info",
    description: "Affiche une annonce d'arrivée d'un nouveau partenaire",
    usage: "w/partner <Nom du gérant> <Lien d'invitation du discord> <Lien vers le logo du serveur> <Nom du parc>",
    statut: "on",
    run: async (client, message, args) => {
        if (args.length < 4) {
            const ErrorEmbed = new Discord.RichEmbed()
                .setColor("RED")
                .setDescription(
                    "Ses arguments sont manquants :x:\nPlus d'informations avec la commande `e/info <Commande>` :bulb:"
                )
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTimestamp()
                .setFooter("WalibiBot", message.guild.iconURL);
            return message.channel.send(ErrorEmbed)
        }
        let things = message.content.trim().split(/ +/g);
        const Name = things.slice(4).join(" ")
        const Owner = args[0]
        const Invite = args[1]
        const Image = args[2]

        const AboutEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("NAVY")
            .setImage(Image)
            .setTitle(":handshake: NOUVEAU PARTENAIRE")
            .setFooter("WalibiBot", message.guild.iconURL)
            .setDescription("**Un nouveau serveur viens de rejoindre nos partenaires !** <a:blob_party:771027997075308565> \nNous sommes heureux d'annoncer notre collaboration avec le serveur **" + Name + "**, administré par **" + Owner + "**.\nEn espérant que cet échange soit bénéfique pour nos 2 projets ! \n**Lien vers leur discord :** " + Invite)
        client.channels.get(`770323720555462697`).send(AboutEmbed);
        message.delete()

    }
};