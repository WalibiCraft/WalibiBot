const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Edit extends Command {
    constructor(...args) {
        super({
            description: "Modifie le message sous forme d'embed indiqué par le nouveau contenu (Ne fonctionne qu'avec les messages du bot et dans le channel où le message se trouve) [Staff Only]",
            usage: ["w/edit <id du message> <nouvelle couleur> <nouveau titre> <nouvelle description>"],
            examples: ["w/edit 903707405584576572 BLUE Event! #「🚨」annonces Bonjour à tous, ceci est une annonce editée !"],
            cooldown: 1000,
            aliases: [""],
            guildOnly: true,
            enabled: true,
            userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
            args: [{ key: 'message', required: true }, { key: 'couleur', required: true }, { key: 'titre', required: true }, { key: 'description', required: true },]
        }, ...args);
    }

    async execute(message, args) {

        const MessageEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Le message que vous avez indiqué n'est pas valide ❌ \nPlus d'informations avec la commande `w/info <Commande>` 💡"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        let msgId = args.message;
        if (!msgId) return message.reply({ embeds: [MessageEmbed] })
        let things = message.content.trim().split(/ +/g);
        const embedchat = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(args.couleur.toString())
            .setTitle(args.titre.toString())
            .setDescription(`${things.slice(5).join(" ")}`)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());


        message.channel.messages.fetch({ around: msgId, limit: 1 }).then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit({ embeds: [embedchat] });
        });
        message.delete()

    }
};
module.exports = Edit
