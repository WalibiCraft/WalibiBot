const Command = require('../../structures/Command');
const Discord = require("discord.js");

class Test extends Command {
    constructor(...args) {
        super({
            description: "Commande de test",
            usage: [""],
            examples: [""],
            cooldown: 1000,
            guildOnly: true,
            enabled: true,
        }, ...args);
    }

    async execute(message, args) {
        const buttonRule = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rules')
                    .setLabel("J'accepte le règlement.")
                    .setStyle('PRIMARY'))

        const buttonTicket = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ticket')
                    .setLabel("Ouvrir un ticket")
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('tickethelp')
                    .setLabel("Comment les tickets fonctionnent-ils ?")
                    .setStyle('SECONDARY'))

        const buttonRole = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('spoilers')
                    .setLabel("@〖 Spoilers 〗")
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('events')
                    .setLabel("@〖 Évents 〗")
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('media')
                    .setLabel("@〖 Médias 〗")
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('partner')
                    .setLabel("@〖 Publicité 〗")
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('help')
                    .setLabel("À quoi correspondent ces rôles ?")
                    .setStyle('SECONDARY'))

        const RulesEmbed = new Discord.MessageEmbed()
            .setTitle("📜 RÈGLEMENT")
            .setColor("5865F2")
            .setDescription(
                "**Une fois ce règlement lu en entier, merci de l’accepter en appuyant sur le bouton \"J'accepte le règlement\" sous ce message pour avoir accès à l'entièreté du serveur Discord.**\n*Si le bouton ne fonctionne pas et que votre rôle « Non vérifié » est toujours présent, ouvrez un ticket dans le channel <#616994843603763213> afin qu'un membre du staff puisse vous aider.*")
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        const TicketEmbed = new Discord.MessageEmbed()
            .setTitle(":ticket: TICKETS")
            .setColor("5865F2")
            .setDescription(
                "**Une question ? Un problème ? Une requête ?**\n*Ce channel est fait pour vous ! Utilisez le bouton ci-dessous \"Ouvrir un ticket\" pour ouvrir un ticket avec notre équipe, qui se fera un plaisir de vous aider ! <:WRA_Logo:784170963200770119>* \n(Si le bouton ne fonctionne pas, merci de DM un membre du staff disponible)")
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());

        const RolesEmbed = new Discord.MessageEmbed()
            .setTitle("🎭 RÔLES")
            .setColor("5865F2")
            .setDescription(
                "Afin d'éviter les pings dérangeants, nous avons mis en place un système de rôle de notifications. **Utilisez les boutons ci-dessous pour obtenir les différents rôles.** \nSi vous souhaitez vous débarasser d'un rôle, cliquez sur le bouton correspondant une seconde fois pour le retirer.")
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL());


        message.guild.channels.cache.get(`722838824782397531`).send({ embeds: [RulesEmbed], components: [buttonRule] })
        message.guild.channels.cache.get(`616994843603763213`).send({ embeds: [TicketEmbed], components: [buttonTicket] })
        message.guild.channels.cache.get(`905246418489442355`).send({ embeds: [RolesEmbed], components: [buttonRole] })


    }
}
module.exports = Test