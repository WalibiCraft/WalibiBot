const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

const Command = require('../../structures/Command');

class PrefixReset extends Command {
    constructor(...args) {
        super({
            description: "Retire le prefix de l'utilisateur ou des personnes ayant le rôle mentionné [Staff Only]",
            usage: ["w/prefixreset <@mention || username || tag || ID> || w/prefix <@role>"],
            examples: ['w/prefixreset @Suicidaul', 'w/prefix Suicidaul', 'w/prefix The_Suicidaul#7969', 'w/prefix 437342188439863296'],
            cooldown: 1000,
            aliases: ["pr", "removeprefix", "deleteprefix"],
            guildOnly: true,
            enabled: true,
            userPermissions: [Discord.Permissions.FLAGS.MANAGE_NICKNAMES],
            args: [
                {
                    key: 'modify',
                    required: true,
                },
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
        if (!role) {
            if (!message.guild.members.cache.find(member => member.id == args.modify.slice(3, -1))) {
                return message.reply({ embeds: [MentionEmbed] });
            } else {
                // pseudo
                let joueur = message.mentions.members.first().user.username;
                let membre = message.guild.members.cache.find(member => member.id == args.modify.slice(3, -1))
                const m = await message.reply({ embeds: [WaitEmbed] });

                membre.setNickname(joueur);

                const PrefixEmbed = new Discord.MessageEmbed()
                    .setTitle("🔧 PREFIX")
                    .setColor("NAVY")
                    .setDescription(
                        "Action effectuée avec succés ✅\nLe nouveau prefix de " +
                        membre.toString() +
                        " a été retiré"
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
                    user1.setNickname(user1.user.username);

                    const PrefixEmbed = new Discord.MessageEmbed()
                        .setTitle("🔧 PREFIX")
                        .setColor("NAVY")
                        .setDescription(
                            "Action effectuée avec succés ✅ \nLe prefix de chaque membre ayant le rôle " +
                            args.modify +
                            " a été retiré"
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
module.exports = PrefixReset
