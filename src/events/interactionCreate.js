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
                interaction.member.roles.add("583765960897593355")
                interaction.member.roles.remove("664477459231801344")
                await interaction.reply({ content: 'Action réalisée avec succès.' });
            } else {
                await interaction.reply({ content: 'Tout est bon ! Vous avez déjà accepté le réglement.', ephemeral: true });
            }
        }
        if (interaction.customId === 'spoilers') {
            if (interaction.member.roles.cache.has("905636263774781440")) {
                interaction.member.roles.remove("905636263774781440")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636263774781440> avec succès.', ephemeral: true });
            } else {
                interaction.member.roles.add("905636263774781440")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636263774781440> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'events') {
            if (interaction.member.roles.cache.has("905636373187411988")) {
                interaction.member.roles.remove("905636373187411988")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636373187411988> avec succès.', ephemeral: true });
            } else {
                interaction.member.roles.add("905636373187411988")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636373187411988> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'media') {
            if (interaction.member.roles.cache.has("905636161567989781")) {
                interaction.member.roles.remove("905636161567989781")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905636161567989781> avec succès.', ephemeral: true });
            } else {
                interaction.member.roles.add("905636161567989781")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905636161567989781> avec succès.', ephemeral: true });
            }
        } 
        if (interaction.customId === 'partner') {
            if (interaction.member.roles.cache.has("905894236711424080")) {
                interaction.member.roles.remove("905894236711424080")
                await interaction.reply({ content: 'Vous avez retiré le rôle <@&905894236711424080> avec succès.', ephemeral: true });
            } else {
                interaction.member.roles.add("905894236711424080")
                await interaction.reply({ content: 'Vous avez ajouté le rôle <@&905894236711424080> avec succès.', ephemeral: true });
            }
        }
        if (interaction.customId === 'help') {
            await interaction.reply({ content: '**Explication de chaque rôle notification :**\n<@&905636263774781440> : Mention à chaque publication d\'un teaser de l\'avancement de notre projet (dans <#709516497328013362>)\n<@&905636161567989781> : Mention à chaque annonce d\'une animation Discord ou en jeu (dans <#722839255440687135>)\n<@&905636373187411988> : Mention à chaque publication sur un de nos réseaux sociaux (dans <#785833950991876116>\n<@&905894236711424080> : Mention à chaque publicité d\'un de nos serveurs partenaires (dans <#717030457631572019>)', ephemeral: true })
        }
        if (interaction.customId === 'tickethelp') {
            await interaction.reply({ content: '**Un ticket est un salon privé avec tout les membres du staff, dans le but d\'aider à régler les problèmes et de répondre à vos questions.**\nVous avez besoin d\'ouvrir un ticket ? Rien de plus simple !\nCliquez simplement sur le bouton du message ci-dessus : Un channel à votre nom sera crée spécialement pour vous dans cette catégorie. Rendez-vous dedans (vous serez mentionné) et commencez directement à nous expliquer votre problème !', ephemeral: true })
        }
        if (interaction.customId === 'ticket') {
            //Vérification channel

            const date = moment().utc(interaction.createdAt).tz("Europe/Paris")
            moment.locale("fr");

            const goodchannel = interaction.member.guild.channels.cache.find(channel => channel.name == "「📨」ticket-" + interaction.member.id)
            if (goodchannel) {
                return await interaction.reply({ content: 'Désolé, mais vous avez déjà ouvert un ticket ! \nRendez vous plutôt dans ce channel : <#' + goodchannel + '>', ephemeral: true })
            }

            //Création du channel ticket
            await interaction.member.guild.channels.create(`「📨」ticket-${interaction.member.id}`, { type: 'text' }).then(c => {
                //Déplacement dans la catégorie
                const category = interaction.member.guild.channels.cache.get("587223080972320788")
                if (category && c) c.setParent(category.id);

                //Permissions
                c.permissionOverwrites.set(
                    [
                        {
                            id: interaction.member.id,
                            allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ATTACH_FILES],
                        },
                        {
                            id: "583766594027651082",
                            allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
                        },
                        {
                            id: interaction.member.guild.roles.everyone.id,
                            deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
                        }
                    ]
                )
                console.log()

                //Message pour les logs
                moment.locale("fr");
                const OpenLogEmbed = new Discord.MessageEmbed()
                    .setColor("PURPLE")
                    .setTitle(":envelope_with_arrow: TICKET LOGS")
                    .setDescription(
                        `Un ticket au nom \`${c.name}\` vient d'être ouvert par ${interaction.member.toString()}.`
                    )
                    /*.addField(
                        ":mag: Raison précisée par l'utilisateur :",
                        '"**' + reason + '**"'
                    )*/
                    .addField(
                        ":clock1: Date de l'action :",
                        date.format("LLLL")
                    )
                    .setAuthor(interaction.member.user.tag, interaction.member.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter("WalibiBot", interaction.member.guild.iconURL());
                interaction.member.guild.channels.cache.get("616991454824235048").send({ embeds: [OpenLogEmbed] });

                //Messages de réponse à l'utilisateur pour le guider
                interaction.reply({ content: '**Votre ticket a bien été ouvert** :white_check_mark: \nRendez vous dans ce channel : ' + '<#' + c + '>' + ':envelope_with_arrow:', ephemeral: true })

                //Messages envoyés dans le channel ticket
                const TicketEmbed = new Discord.MessageEmbed()
                    .setColor("17ace8")
                    .setTitle(":envelope_with_arrow: TICKET")
                    .setDescription(
                        "**Bienvenue " + interaction.member.user.username + " et merci d'utiliser nos services !** \n:pushpin: Expliquez votre problème avec le plus de détails possible, en joignant des screens/un rec si nécéssaire. \n:police_officer: Notre staff viendra répondre à votre demande dans les plus brefs délais. \n:warning: N'oubliez pas que l'ouverture de ticket sans raison valable est interdite et sanctionnable. \n:information_source: Utilisez `w/ticket close` pour fermer le ticket une fois votre problème réglé."

                    )
                    /*.addField(
                        ":mag: Raison précisée par l'utilisateur :",
                        '"**' + reason + '**"'
                    )*/
                    .addField(
                        ":clock1: Date de l'ouverture du ticket :", date.format("LLLL")
                    )
                    .setTimestamp()
                    .setFooter("WalibiBot", interaction.member.guild.iconURL());
                c.send(`<@&583766594027651082>, ${interaction.member.toString()} viens d'ouvrir un ticket !`)
                c.send({ embeds: [TicketEmbed] });
            })
        }
    }
}
module.exports = InteractionCreate;