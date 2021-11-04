const Event = require('../structures/Event');
const Discord = require('discord.js')
const moment = require('moment-timezone');

class InteractionCreate extends Event {
    // eslint-disable-next-line no-useless-constructor
    constructor(...args) {
        super(...args);
    }
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'rules') {
            if (interaction.member.roles.cache.has("664477459231801344")) {
                await interaction.member.roles.add("583765960897593355")
                await interaction.member.roles.remove("664477459231801344")
                await interaction.reply({ content: 'Action réalisée avec succès.' });
            } else {
                await interaction.reply({ content: 'Tout est bon ! Vous avez déjà accepté le réglement.', ephemeral: true });
            }
        }
        if (interaction.customId === 'spoilers') {
            if (interaction.member.roles.cache.has("905636263774781440")) {
                await interaction.member.roles.remove("905636263774781440")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636263774781440> avec succès.', ephemeral: true });
            } else {
                await interaction.member.roles.add("905636263774781440")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636263774781440> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'events') {
            if (interaction.member.roles.cache.has("905636373187411988")) {
                await interaction.member.roles.remove("905636373187411988")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636373187411988> avec succès.', ephemeral: true });
            } else {
                await interaction.member.roles.add("905636373187411988")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636373187411988> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'media') {
            if (interaction.member.roles.cache.has("905636161567989781")) {
                await interaction.member.roles.remove("905636161567989781")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636161567989781> avec succès.', ephemeral: true });
            } else {
                await interaction.member.roles.add("905636161567989781")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636161567989781> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'help') {
            await interaction.reply({ content: '**Explication de chaque rôle notification :**\n<@&905636263774781440> : Mention à chaque publication d\'un teaser de l\'avancement de notre projet (dans <#709516497328013362>)\n<@&905636161567989781> : Mention à chaque annonce d\'une animation Discord ou en jeu (dans <#722839255440687135>)\n<@&905636373187411988> : Mention à chaque publication sur un de nos réseaux sociaux(dans <#785833950991876116>)', ephemeral: true })
        }
        if (interaction.customId === 'tickethelp') {
            await interaction.reply({ content: '**Un ticket est un salon privé avec tout les membres du staff, dans le but d\'aider à régler les problèmes et de répondre à vos questions.**\nVous avez besoin d\'ouvrir un ticket ? Rien de plus simple !\nCliquez simplement sur le bouton du message ci-dessus : Un channel à votre nom sera crée spécialement pour vous dans cette catégorie. Rendez-vous dedans (vous serez mentionné) et commencez directement à nous expliquer votre problème !', ephemeral: true })
        }
        if (interaction.customId === 'ticket') {
            
        }
    }
}
module.exports = InteractionCreate;