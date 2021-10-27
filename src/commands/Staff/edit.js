const Discord = require("discord.js");

module.exports = {
    name: "edit",
    aliases: ["édit"],
    category: "Staff",
    description:
        "Modifie le message sous forme d'embed indiqué par le nouveau contenu (Ne fonctionne qu'avec les messages du bot) [Staff Only]",
    usage: "w/edit <id du message> <nouvelle couleur> <nouveau titre> <nouvelle description>",
    statut: "on",
    run: async (client, message, args) => {
        const PermEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous n'avez pas l'autorisation de faire ça, bien tenté ! ❌"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(PermEmbed);

        const Idembed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez entrer l'id du message que vous voulez éditer ❌ \nPlus d'information avec la commande `w/info <Commande>` 💡"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(PermEmbed);

        const TextEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez entrer le nouveau contenu du message que vous voulez éditer ❌ \nPlus d'information avec la commande `w/info <Commande>` 💡"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(PermEmbed);

        let things = message.content.trim().split(/ +/g);
        if (!args[0]) return message.channel.send(Idembed);
        if (isNaN(args[0])) return message.channel.send(Idembed);
        if (!args[1]) return message.channel.send(TextEmbed);
        let msgId = args[0];

        let embedchat = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(args[1])
            .setTitle(args[2])
            .setDescription(`${things.slice(4).join(" ")}`)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());
        //message.delete();


        message.channel.fetchMessages({ around: msgId, limit: 1 }).then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit(embedchat);
        });

        //message.delete();
    }
};