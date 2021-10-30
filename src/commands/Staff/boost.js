const Discord = require("discord.js");
const Command = require('../../structures/Command');

class Boost extends Command {
    constructor(...args) {
        super({
            description: "Affiche un embed spécial pour rémercier un boost de serveur [Staff Only]",
            usage: ["w/boost <@mention || username || tag || ID>"],
            examples: ['w/boost @Rakox', 'w/boost Rakox', 'w/boost Rakox#6769', 'w/boost 490461455741747200'],
            cooldown: 1000,
            aliases: [""],
            guildOnly: true,
            enabled: false,
            userPermissions: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
            args: [
                {
                    key: 'user',
                    type: 'User',
                }
            ]
        }, ...args);
    }
    async execute(message, args) {
        let booster = args.user

        //Embed de boost
        const BoostEmbed = new Discord.MessageEmbed()
            .setTitle("<a:Boosting:661258026614915073> BOOST")
            .setColor("ff66e2")
            .setDescription(
                booster.toString() +
                " viens de booster le serveur ! Merci à lui <a:Pepe_NitroBoost:635137208474664961>"
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setImage(
                "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
            );

        const doneEmbed = new Discord.MessageEmbed()
            .setTitle("<a:Boosting:661258026614915073> BOOST")
            .setColor("NAVY")
            .setDescription(
                "Action effectuée avec succés ✅\n ")
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());
        message.reply({ embeds: [doneEmbed] })
        message.guild.channels.cache.get("722838096000974909").send({ embeds: [BoostEmbed] });
    }
};
module.exports = Boost
