const Event = require('../structures/Event');
const Discord = require('discord.js')
const moment = require('moment-timezone');

class GuildMemberUpdate extends Event {
    // eslint-disable-next-line no-useless-constructor
    constructor(...args) {
        super(...args);
    }
    async execute(oldMember, newMember) {
        if (!oldMember.roles.cache.has("586510299037696022") && newMember.roles.cache.has("586510299037696022")) {
            const BoostEmbed = new Discord.MessageEmbed()
                .setTitle("🥰 BOOST")
                .setColor("ff66e2")
                .setDescription(
                    oldMember.toString() +
                    " viens de booster le serveur ! Merci à lui 😍"
                )
                .setTimestamp()
                .setFooter("WalibiBot", oldMember.guild.iconURL())
                .setImage(
                    "https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif"
                );
                oldMember.guild.channels.cache.get("722838096000974909").send({ embeds: [BoostEmbed]});
        };
    }
}

module.exports = GuildMemberUpdate;
