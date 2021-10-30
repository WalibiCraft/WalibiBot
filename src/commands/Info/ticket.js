const moment = require('moment-timezone');
const Command = require('../../structures/Command');
const Discord = require('discord.js')
const fs = require('fs');

class Ticket extends Command {
    constructor(...args) {
        super({
            description: "Vous permet d'ouvrir un ticket (channel privé avec tout le staff) afin que nous puissions vous apporter l'aide nécéssaire",
            usage: "w/ticket <new> <reason> || w/ticket close",
            examples: ["w/ticket new Report d'un joueur", "w/ticket new J'ai trouvé un bug", "w/ticket new Question sur le serveur"],
            cooldown: 1000,
            guildOnly: true,
            args: [
                {
                    key: 'string1',
                    required: true
                },
                {
                    key: 'string2',
                    required: false
                }
            ]
        }, ...args);
    }
    async execute(message, args) {

        const date = moment().utc(message.createdAt).tz("Europe/Paris")
        moment.locale("fr");

        async function getAllMessages(channel, limit = 500) {
            const sum_messages = [];
            let last_id;

            while (true) {
                const options = { limit: 100 };
                if (last_id) {
                    options.before = last_id;
                }

                const messages = await channel.messages.fetch(options);
                sum_messages.push(...messages.values());
                last_id = messages.last().id;
                if (messages.size != 100 || sum_messages >= limit) {
                    break;
                }
            }

            return sum_messages;
        }
        //Init du txt
        let name = ".\\tickets_logs\\" + message.channel.name.replace("「📨」", "") + moment().utc(message.channel.createdAt).tz("Europe/Paris").format('_Do-MM-YYYY_hh-mm-ss') + ".txt"

        //Déclaration des premières const
        let GoodChannel = message.guild.channels.cache.find(channel => channel.name === `「📨」ticket-${message.author.id}`);
        let author = message.author
        let guild = message.guild;

        //Déclaration des Embeds d'erreur
        const AlreadyOpenEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous avez déjà ouvert un ticket :x: \nRendez vous plutôt dans ce channel : " +
                '<#' + GoodChannel + '>' +
                " :white_check_mark:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const ErrorCloseEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez être dans un channel ticket pour le fermer :x:\nRendez vous plutôt dans ce channel : " +
                '<#' + GoodChannel + '>' +
                " :white_check_mark: \nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const BadChannelEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous faites cette commande de le mauvais channel :x:\nIl faut vous rendre dans le channel <#616994843603763213> pour exécuter celle-ci :white_check_mark:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const ReasonEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez préciser une raison d'ouverture de ticket :x:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const PermEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Vous n'avez pas l'autorisation de faire ça, bien tenté ! :x:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const StopEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "La fermeture du ticket à bien été annulée :x:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const NoArgEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                "Cet argument n'est pas reconnu, essayez plutôt `w/ticket new <raison>` :x:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        //Déclaration des premiers Embed (Avec des const fixes)
        const ConfirmEmbed = new Discord.MessageEmbed()
            .setColor("17ace8")
            .setTitle(":envelope_with_arrow: TICKET")
            .setDescription(
                "Êtes vous sûr de vouloir fermer ce ticket ? Cette action est irréversible ! :warning:\nTapez `w/yes` ou `w/no` dans les 10 prochaines secondes pour continuer :timer:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        const CloseEmbed = new Discord.MessageEmbed()
            .setColor("17ace8")
            .setTitle(":envelope_with_arrow: TICKET")
            .setDescription(
                "Le ticket à été fermé avec succès, l'utilisateur qui l'a ouvert ne voit plus cette conversation :white_check_mark:"
            )
            .addField(":dividers: Utilisez `w/ticket register`", "Pour archiver la conversation\n*:warning: Enregistre uniquement les 100 derniers messages*")
            .addField(":wastebasket: Utilisez `w/ticket delete`", "Pour supprimer le ticket\n*:warning: Obligatoire sinon la personne ne peut plus réouvrir de ticket*")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL());

        //Vérification des arguments

        //Ouverture ticket
        if (args.string1.toLowerCase() === "new" || args.string1.toLowerCase() === "create" || args.string1.toLowerCase() === "open" || args.string1.toLowerCase() === "n") {
            if (message.channel.id === "616994843603763213") {

                //Vérification channel
                if (message.guild.channels.cache.find(channel => channel.name == "「📨」ticket-" + message.author.id)) {
                    message.reply({ embeds: [AlreadyOpenEmbed] }).then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                        setTimeout(() => message.delete(), 10000);
                    });
                    return;
                }

                //Vérification raison
                const reason = message.content
                    .split(" ")
                    .slice(2)
                    .join(" ");

                if (!args.string2) {
                    message.reply({ embeds: [ReasonEmbed] }).then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                        setTimeout(() => message.delete(), 10000);
                    });
                }

                //Création du channel ticket
                await message.guild.channels.create(`「📨」ticket-${message.author.id}`, { type: 'text' }).then(c => {
                    //Déplacement dans la catégorie
                    const category = message.guild.channels.cache.get("587223080972320788")
                    //console.log(c, category)
                    if (category && c) c.setParent(category.id);

                    //Permissions
                    c.permissionOverwrites.set(
                        [
                            {
                                id: message.author.id,
                                allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES, Discord.Permissions.FLAGS.ATTACH_FILES],
                            },
                            {
                                id: "583766594027651082",
                                allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
                            },
                            {
                                id: message.guild.roles.everyone.id,
                                deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
                            }
                        ]
                    )

                    //Message pour les logs
                    moment.locale("fr");
                    const OpenLogEmbed = new Discord.MessageEmbed()
                        .setColor("PURPLE")
                        .setTitle(":envelope_with_arrow: TICKET LOGS")
                        .setDescription(
                            `Un ticket au nom \`${c.name}\` vient d'être ouvert par ${message.author}.`
                        )
                        .addField(
                            ":mag: Raison précisée par l'utilisateur :",
                            '"**' + reason + '**"'
                        )
                        .addField(
                            ":clock1: Date de l'action :",
                            date.format("LLLL")
                        )
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter("WalibiBot", message.guild.iconURL());
                    message.guild.channels.cache.get("616991454824235048").send({ embeds: [OpenLogEmbed] });

                    //Messages de réponse à l'utilisateur pour le guider
                    const OpenEmbed = new Discord.MessageEmbed()
                        .setColor("17ace8")
                        .setTitle(":envelope_with_arrow: TICKET")
                        .setDescription(
                            'Votre ticket a bien été ouvert pour la raison : **\"' +
                            reason +
                            '\"** :white_check_mark: \nRendez vous dans ce channel : ' +
                            '<#' + c + '>' + " :envelope_with_arrow: "
                        )
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTimestamp()
                        .setFooter("WalibiBot", message.guild.iconURL());

                    message.reply({ embeds: [OpenEmbed] }).then(msg => {
                        setTimeout(() => msg.delete(), 10000);
                        setTimeout(() => message.delete(), 10000);
                    });

                    //Messages envoyés dans le channel ticket
                    const TicketEmbed = new Discord.MessageEmbed()
                        .setColor("17ace8")
                        .setTitle(":envelope_with_arrow: TICKET")
                        .setDescription(
                            "**Bienvenue " + message.author.username + " et merci d'utiliser nos services !** \n:pushpin: Expliquez votre problème avec le plus de détails possible, en joignant des screens/un rec si nécéssaire. \n:police_officer: Notre staff viendra répondre à votre demande dans les plus brefs délais. \n:warning: N'oubliez pas que l'ouverture de ticket sans raison valable est interdite et sanctionnable. \n:information_source: Utilisez `w/ticket close` pour fermer le ticket une fois votre problème réglé"

                        )
                        .addField(
                            ":mag: Raison précisée par l'utilisateur :",
                            '"**' + reason + '**"'
                        )
                        .addField(
                            ":clock1: Date de l'ouverture du ticket :", date.format("LLLL")
                        )
                        .setTimestamp()
                        .setFooter("WalibiBot", message.guild.iconURL());
                    //c.send(`<@&583766594027651082>, ${message.author} viens d'ouvrir un ticket !`)
                    c.send({ embeds: [TicketEmbed] });
                })
            } else return message.reply({ embeds: [BadChannelEmbed] });
        } else

            //Fermeture du ticket
            if (args.string1.toLowerCase() === "close" || args.string1.toLowerCase() === "c") {
                if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.reply({ embeds: [ErrorCloseEmbed] });

                message.channel.permissionOverwrites.edit(message.author.id, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false,
                });
                const CloseLogEmbed = new Discord.MessageEmbed()
                    .setColor("PURPLE")
                    .setTitle(":envelope_with_arrow: TICKET LOGS")
                    .addField(":clock1: Date de l'action :", date.format("LLLL"))
                    .setDescription(
                        `Le ticket au nom \`${message.channel.name}\` a été fermé par ${message.author}.`
                    )
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL()
                    )
                    .setTimestamp()
                    .setFooter("WalibiBot", message.guild.iconURL());

                message.guild.channels.cache
                    .get("616991454824235048")
                    .send({ embeds: [CloseLogEmbed] })
                message.reply({ embeds: [CloseEmbed] })
            } else

                //Enregistrement du contenu du ticket pour un fichier txt
                if (args.string1.toLowerCase() === "register") {
                    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ embeds: [PermEmbed] });
                    if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.reply({ embeds: [ErrorCloseEmbed] });

                    //let msg = await message.reply("**<a:Typing:635137206796681253> Archivement en cours...**");
                    //message.channel.startTyping();
                    getAllMessages(message.channel).then(messages => {
                        let text = "";
                        let all = "";
                        let intro = `[LOGS WALIBI - ${message.channel.name}]\n`;
                        let dates, dateToString;
                        //Logs
                        messages.forEach(msg => {
                            dates = new Date(msg.createdTimestamp);
                            dateToString = `Le ${dates.getDate()}/${dates.getMonth()} à ${dates.getHours()}:${dates.getMinutes()}`;

                            text = `[${dateToString}] [De : ${msg.author.tag} (${msg.author.id})] : \n${msg.content}\n\n`;
                            all += intro + text;
                        })
                        fs.writeFile(name, all, (err) => {
                            if (err) throw err;
                        });
                        let attachment = new Discord.MessageAttachment(Buffer.from(all, 'utf-8'), name)
                        message.guild.channels.cache.get("616991454824235048").send({ files: [attachment] });

                        const RegisterEmbed = new Discord.MessageEmbed()
                            .setColor("17ace8")
                            .setTitle(":envelope_with_arrow: TICKET")
                            .setDescription("La conversation à été archivée avec succès :white_check_mark:")
                            .addField(":dividers: Lien vers l'archive de la conversation :", "https://discord.com/channels/" + message.guild.id + "/" + message.guild.channels.cache.get("616991454824235048").id)
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL());

                        moment.locale("fr");
                        const RegisterLogEmbed = new Discord.MessageEmbed()
                            .setColor("PURPLE")
                            .setTitle(":envelope_with_arrow: TICKET LOGS")
                            .setDescription(`Le ticket au nom \`${message.channel.name}\` a été archivé par ${message.author}.`)
                            .addField(":clock1: Date de l'action :", date.format("LLLL"))
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL());

                        message.reply({ embeds: [RegisterEmbed] });
                        message.guild.channels.cache.get("616991454824235048").send({ embeds: [RegisterLogEmbed] });
                    },
                    )
                } else

                    //Supression du  ticket
                    if (args.string1.toLowerCase() === "delete" || args.string1.toLowerCase() === "d") {
                        //Vérifications classiques
                        if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ embeds: [PermEmbed] });
                        if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.reply({ embeds: [ErrorCloseEmbed] });

                        // Confirmation
                        let msg = await message.reply({ embeds: [ConfirmEmbed] });
                        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 9000 });
                        collector.on('collect', message => {
                            if (message.content.toLowerCase() == "w/yes") {
                                message.reply("**<a:Typing:635137206796681253> Supression dans quelques secondes...**");
                                setTimeout(function () {
                                    const DelLogEmbed = new Discord.MessageEmbed()
                                        .setColor("PURPLE")
                                        .setTitle(":envelope_with_arrow: TICKET LOGS")
                                        .addField(":clock1: Date de l'action :", date.format("LLLL"))
                                        .setDescription(
                                            `Le ticket au nom \`${message.channel.name}\` a été supprimé par ${message.author}.`
                                        )
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.displayAvatarURL()
                                        )
                                        .setTimestamp()
                                        .setFooter("WalibiBot", message.guild.iconURL());

                                    message.guild.channels.cache
                                        .get("616991454824235048")
                                        .send({embeds: [DelLogEmbed]})
                                    message.channel.delete();
                                }, 10000);
                                //Anulation du ticket
                            } else if (message.content.toLowerCase() == "w/no") {
                                return message.reply({ embeds: [StopEmbed] });
                            }
                        })
                        /*
                        collector.on('end', message => {
                            if (!message.content) {
                                const TimeEmbed = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(
                                        "Vous avez mis trop de temps a confirmer la fermeture, l'action est donc annulée :x:"
                                    )
                                    .setAuthor(author.tag, author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter("WalibiBot", guild.iconURL());
                                try {
                                    msg.edit({ embeds: [TimeEmbed]})
                                }  catch (err) { 

                                }
                            }
                        });
                        */
                    } else {
                        //Argument inconnu
                        if (args.string1) {
                            message.reply({ embeds: [NoArgEmbed] }).then(msg => {
                                setTimeout(() => msg.delete(), 10000);
                                setTimeout(() => message.delete(), 10000);
                            });
                        }
                    }
    }
}

module.exports = Ticket;