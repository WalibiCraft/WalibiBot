const Discord = require("discord.js");

const Command = require('../../structures/Command');

class Partner extends Command {
    constructor(...args) {
        super({
            description: "Affiche une annonce d'arrivée d'un nouveau partenaire [Staff only]",
            usage: ["w/partner <Nom du gérant> <Lien d'invitation du discord> <Lien vers le logo du serveur> <Nom du parc>"],
            examples: ["w/partner Asarix https://discord.gg/asamod https://imgur.com/gallery/asaroux AsaLand"],
            cooldown: 1000,
            aliases: ["partenaire", "partenaire_particulier"],
            userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
            guildOnly: true,
            enabled: true,
            args: [
                {
                    key: 'owner',
                    required: true
                },
                {
                    key: 'invite',
                    required: true
                },
                {
                    key: 'image',
                    required: true
                },
                {
                    key: 'name',
                    required: true
                },
            ]
        }, ...args);
    }
    async execute(message, args) {
        let things = message.content.trim().split(/ +/g);
        const Name = things.slice(4).join(" ")
        const Owner = args.owner
        const Invite = args.invite
        const Image = args.image

        const AboutEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setColor("NAVY")
            .setImage(Image)
            .setTitle(":handshake: NOUVEAU PARTENAIRE")
            .setFooter("WalibiBot", message.guild.iconURL())
            .setDescription("**Un nouveau serveur viens de rejoindre nos partenaires !** <a:blob_party:771027997075308565> \nNous sommes heureux d'annoncer notre collaboration avec le serveur **" + Name + "**, administré par **" + Owner + "**.\nEn espérant que cet échange soit bénéfique pour nos 2 projets ! \n**Lien vers leur discord :** " + Invite)
        message.guild.channels.cache.get(`722841863429816481`).send({ embeds: [AboutEmbed] });
        //message.delete()
    }
};
module.exports = Partner
