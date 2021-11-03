const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

const Command = require('../../structures/Command');

class Prefix extends Command {
    constructor(...args) {
        super({
            description: "Change le prefix de l'utilisateur ou des personnes ayant le rôle mentionné [Staff Only]",
            usage: ['w/prefix <@mention || username || tag || ID> <prefix>',  'w/prefix <@role> <prefix>'],
            examples: ['w/prefix @Suicidaul 💞', 'w/prefix Suicidaul 💞', 'w/prefix The_Suicidaul#7969 💞', 'w/prefix 437342188439863296 💞'],
            cooldown: 1000,
            aliases: ["changeprefix", "préfix"],
            guildOnly: true,
            enabled: true,
            userPermissions: [Discord.Permissions.FLAGS.MANAGE_NICKNAMES],
            args: [
                {
                    key: 'modify',
                    required: true,
                },
                {
                    key: 'prefix',
                    required: true
                }
            ]
        }, ...args);
    }
    async execute(message, args) {
        const MentionEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez mentionner un utilisateur ou un rôle ❌ \nPlus d'information avec la commande `w/info <Commande>` 💡"
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        const WaitEmbed = new Discord.MessageEmbed()
            .setTitle("🔧 PREFIX")
            .setColor("NAVY")
            .setDescription(
                "Action en cours, veuillez patienter, cela peut prendre plusieurs minutes."
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        const roleID = args.modify.slice(3, -1);
        const role = message.guild.roles.cache.get(roleID);
        const prefixMsg = args.prefix;
        if (!role) {
            if (!message.guild.members.cache.find(member => member.id == args.modify.slice(3, -1))) {
                return message.reply({ embeds: [MentionEmbed] });
            } else {
                // pseudo
                let joueur = message.mentions.members.first().user.username;
                let membre = message.guild.members.cache.find(member => member.id == args.modify.slice(3, -1))
                const m = await message.reply({ embeds: [WaitEmbed] });

                membre.setNickname("[" + prefixMsg + "] " + joueur);

                const PrefixEmbed = new Discord.MessageEmbed()
                    .setTitle("🔧 PREFIX")
                    .setColor("NAVY")
                    .setDescription(
                        "Action effectuée avec succés ✅\nLe nouveau prefix de " +
                        membre.toString() +
                        " est maintenant **[" +
                        prefixMsg +
                        "]**"
                    )
                    .setTimestamp()
                    .setFooter("WalibiBot", message.guild.iconURL())
                    .setAuthor(message.author.tag, message.author.displayAvatarURL());

                m.edit({ embeds: [PrefixEmbed] });
            }
        } else {
            let roleMembers = message.guild.roles.cache.get(roleID).members;
            const m = await message.reply({ embeds: [WaitEmbed] });
            //message.channel.startTyping();

            roleMembers.forEach(async user1 => {
                if (user1.roles.cache.has(roleID)) {
                    user1.setNickname("[" + prefixMsg + "] " + user1.user.username);

                    const PrefixEmbed = new Discord.MessageEmbed()
                        .setTitle("🔧 PREFIX")
                        .setColor("NAVY")
                        .setDescription(
                            "Action effectuée avec succés ✅ \nLe prefix de chaque membre ayant le rôle " +
                            args.modify +
                            " a été modifié en **" +
                            prefixMsg +
                            "**"
                        )
                        .setTimestamp()
                        .setFooter("WalibiBot", message.guild.iconURL())
                        .setAuthor(message.author.tag, message.author.displayAvatarURL());

                    m.edit({embeds: [PrefixEmbed]});
                }
            });
        }
    }
};
module.exports = Prefix
