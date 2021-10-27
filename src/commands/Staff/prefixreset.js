const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

module.exports = {
    name: "prefixreset",
    aliases: ["noprefix", "prefixr"],
    category: "staff",
    description: "Remet a 0 le prefix de l'utilisateur mentionné [Staff Only]",
    usage: "w/prefixreset <@user> | w/prefixreset <@role>",
    statut: "on",
    run: async (client, message, args) => {
        const MentionEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez mentionner un utilisateur ou un rôle ❌\nPlus d'information avec la commande `w/info <Commande>` 💡"
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        const PermEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous n'avez pas l'autorisation de faire ça, bien tenté ! ❌"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())

        const WaitEmbed = new Discord.RichEmbed()
            .setTitle("🔧 PREFIX")
            .setColor("NAVY")
            .setDescription(
                "Action en cours, veuillez patienter. \nCela peut prendre plusieurs minutes."
            )
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(PermEmbed);

        // role
        const Args = message.content.split(" ");
        const roleArgs = Args.slice(1, 2);
        const roleID = roleArgs[0].slice(3, -1);
        const role = message.guild.roles.get(roleID);
        if (!role) {
            if (message.mentions.users.size == 0) {
                return message.channel.send(MentionEmbed);
            } else {
                // pseudo
                let joueur = message.guild.member(message.mentions.users.first()).user
                    .username;
                let membre = message.guild.member(message.mentions.users.first());
                const m = await message.channel.send(WaitEmbed);
                message.guild
                    .member(message.mentions.users.first())
                    .setNickname(joueur);

                const PrefixEmbed = new Discord.RichEmbed()
                    .setTitle("🔧 PREFIX")
                    .setColor("NAVY")
                    .setDescription(
                        "Action effectuée avec succés ✅\nLe prefix de " +
                        membre +
                        " a été supprimé"
                    )
                    .setTimestamp()
                    .setFooter("WalibiBot", message.guild.iconURL())
                    .setAuthor(message.author.tag, message.author.displayAvatarURL());

                m.edit(PrefixEmbed);
            }
        } else {
            let roleMembers = message.guild.roles.get(roleID).members;
            const m = await message.channel.send(WaitEmbed);
            //message.channel.startTyping();

            roleMembers.forEach(async user => {
                if (user.roles.has(roleID)) {
                    user.setNickname(`${client.users.get(user.id).username}`);

                    const PrefixEmbed = new Discord.RichEmbed()
                        .setTitle("🔧 PREFIX")
                        .setColor("NAVY")
                        .setDescription(
                            "Action effectuée avec succés ✅\nLe prefix de chaque membre ayant le rôle " +
                            roleArgs +
                            " a été supprimé"
                        )
                        .setTimestamp()
                        .setFooter("WalibiBot", message.guild.iconURL())
                        .setAuthor(message.author.tag, message.author.displayAvatarURL());

                    m.edit(PrefixEmbed);
                }
            });
        }
    }
};