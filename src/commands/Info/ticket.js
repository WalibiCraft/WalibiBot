const moment = require('moment-timezone');
const Command = require('../../structures/Command');
const Discord = require('discord.js')

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
                    key: 'string',
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
        
                const messages = await channel.fetchMessages(options);
                sum_messages.push(...messages.array());
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
        let GoodChannel = message.guild.channels.find(channel => channel.name === `「📨」ticket-${message.author.id}`);
        let author = message.author
        let guild = message.guild;

        //Déclaration des Embeds d'erreur
        const AlreadyOpenEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous avez déjà ouvert un ticket :x: \nRendez vous plutôt dans ce channel : " +
                GoodChannel +
                " :white_check_mark:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const ErrorCloseEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez être dans un channel ticket pour le fermer :x:\nRendez vous plutôt dans ce channel : " +
                GoodChannel +
                " :white_check_mark: \nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const BadChannelEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous faites cette commande de le mauvais channel :x:\nIl faut vous rendre dans le channel <#616994843603763213> pour exécuter celle-ci :white_check_mark:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const ReasonEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez préciser une raison d'ouverture de ticket :x:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const PermEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous n'avez pas l'autorisation de faire ça, bien tenté ! :x:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const StopEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "La fermeture du ticket à bien été annulée :x:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const ArgEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Vous devez préciser un argument, essayez par exemple `w/ticket new <raison>` :x:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const NoArgEmbed = new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
                "Cet argument n'est pas reconnu, essayez plutôt `w/ticket new <raison>` :x:\nPlus d'informations avec la commande `w/info <Commande>` :bulb:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        //Déclaration des premiers Embed (Avec des const fixes)
        const ConfirmEmbed = new Discord.RichEmbed()
            .setColor("17ace8")
            .setTitle(":envelope_with_arrow: TICKET")
            .setDescription(
                "Êtes vous sûr de vouloir fermer ce ticket ? Cette action est irréversible ! :warning:\nTapez `w/yes` ou `w/no` dans les 10 prochaines secondes pour continuer :timer:"
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        const CloseEmbed = new Discord.RichEmbed()
            .setColor("17ace8")
            .setTitle(":envelope_with_arrow: TICKET")
            .setDescription(
                "Le ticket à été fermé avec succès, l'utilisateur qui l'a ouvert ne voit plus cette conversation :white_check_mark:"
            )
            .addField(":dividers: Utilisez `w/ticket register`", "Pour archiver la conversation\n*:warning: Enregistre uniquement les 100 derniers messages*")
            .addField(":wastebasket: Utilisez `w/ticket delete`", "Pour supprimer le ticket\n*:warning: Obligatoire sinon la personne ne peut plus réouvrir de ticket*")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL);

        //Vérification des arguments
        if (!args[0]) {
            message.delete();
            message.channel.send(ArgEmbed).then(msg => {
                msg.delete(10000);
            });
        }

        //Ouverture ticket
        if (args[0].toLowerCase() === "new" || args[0].toLowerCase() === "create" || args[0].toLowerCase() === "open" || args[0].toLowerCase() === "n") {
            if (message.channel.id === "616994843603763213") {

                //Vérification channel
                if (message.guild.channels.exists(channel => channel.name == "「📨」ticket-" + message.author.id)) {
                    message.delete();
                    message.channel.send(AlreadyOpenEmbed).then(msg => {
                        msg.delete(10000);
                    });
                    return;
                }

                //Vérification raison
                const reason = message.content
                    .split(" ")
                    .slice(2)
                    .join(" ");

                if (!args[1]) {
                    message.delete();
                    return message.channel.send(ReasonEmbed).then(msg => {
                        msg.delete(10000);
                    });
                }

                //Création du channel ticket
                message.guild
                    .createChannel(`「📨」ticket-${message.author.id}`, {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                id: message.author.id,
                                allowed: ['READ_MESSAGES', 'SEND_MESSAGES'],
                            },
                            {
                                id: "583766594027651082",
                                allowed: ['READ_MESSAGES', 'SEND_MESSAGES'],
                            },
                            {
                                id: message.guild.id,
                                denied: ['READ_MESSAGES', 'SEND_MESSAGES']
                            }
                        ],
                    })

                    //Mise en place du channel dans la catégorie
                    .then(c => {
                        let category = message.guild.channels.find(
                            c => c.id == "587223080972320788" && c.type == "category"
                        ),
                            channel = message.guild.channels.find(
                                c => c.name == `「📨」ticket-${message.author.id}` && c.type == "text"
                            );
                        if (category && channel) channel.setParent(category.id);

                        //Message pour les logs
                        moment.locale("fr");
                        const OpenLogEmbed = new Discord.RichEmbed()
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
                            .setAuthor(message.author.tag, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL);
                        client.channels.get("616991454824235048").send(OpenLogEmbed);

                        //Messages de réponse à l'utilisateur pour le guider
                        let GoodChannel = message.guild.channels.find(channel => channel.name === `「📨」ticket-${message.author.id}`);
                        const OpenEmbed = new Discord.RichEmbed()
                            .setColor("17ace8")
                            .setTitle(":envelope_with_arrow: TICKET")
                            .setDescription(
                                'Votre ticket a bien été ouvert pour la raison : **\"' +
                                reason +
                                '\"** :white_check_mark: \nRendez vous dans ce channel : ' +
                                GoodChannel + " :envelope_with_arrow: "
                            )
                            .setAuthor(message.author.tag, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL);

                        message.delete();
                        message.channel.send(OpenEmbed).then(msg => {
                            msg.delete(10000);
                        });

                        //Messages envoyés dans le channel ticket
                        const TicketEmbed = new Discord.RichEmbed()
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
                            .setFooter("WalibiBot", message.guild.iconURL);
                        c.send(`<@&583766594027651082>, ${message.author} viens d'ouvrir un ticket !`)
                        c.send(TicketEmbed);
                    });
            } else return message.channel.send(BadChannelEmbed);
        } else

            //Fermeture du ticket
            if (args[0].toLowerCase() === "close" || args[0].toLowerCase() === "c") {
                if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.channel.send(ErrorCloseEmbed);

                message.channel.overwritePermissions(message.author.id, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false,
                });
                const CloseLogEmbed = new Discord.RichEmbed()
                    .setColor("PURPLE")
                    .setTitle(":envelope_with_arrow: TICKET LOGS")
                    .addField(":clock1: Date de l'action :", date.format("LLLL"))
                    .setDescription(
                        `Le ticket au nom \`${message.channel.name}\` a été fermé par ${message.author}.`
                    )
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setFooter("WalibiBot", message.guild.iconURL);

                client.channels
                    .get("616991454824235048")
                    .send(CloseLogEmbed)
                message.channel.send(CloseEmbed)
            } else

                //Enregistrement du contenu du ticket pour un fichier txt
                if (args[0].toLowerCase() === "register") {
                    if (!message.member.roles.has("583766594027651082")) return message.channel.send(PermEmbed);
                    if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.channel.send(ErrorCloseEmbed);

                    let msg = await message.channel.send("**<a:Typing:635137206796681253> Archivement en cours...**");
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
                        let file = fs.writeFile(name, all, (error) => {
                        });
                        let msgs = client.channels.get("616991454824235048").send({
                            files: [name]
                        });
                        const RegisterEmbed = new Discord.RichEmbed()
                            .setColor("17ace8")
                            .setTitle(":envelope_with_arrow: TICKET")
                            .setDescription("La conversation à été archivée avec succès :white_check_mark:")
                            .addField(":dividers: Lien vers l'archive de la conversation :", "https://discord.com/channels/" + client.channels.get("616991454824235048").guild.id + "/" + client.channels.get("616991454824235048").id)
                            .setAuthor(message.author.tag, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL);

                        moment.locale("fr");
                        const RegisterLogEmbed = new Discord.RichEmbed()
                            .setColor("PURPLE")
                            .setTitle(":envelope_with_arrow: TICKET LOGS")
                            .setDescription(`Le ticket au nom \`${message.channel.name}\` a été archivé par ${message.author}.`)
                            .addField(":clock1: Date de l'action :", date.format("LLLL"))
                            .setAuthor(message.author.tag, message.author.displayAvatarURL)
                            .setTimestamp()
                            .setFooter("WalibiBot", message.guild.iconURL);

                        msg.edit(RegisterEmbed);
                        client.channels.get("616991454824235048").send(RegisterLogEmbed);
                    },
                    )
                } else

                    //Supression du  ticket
                    if (args[0].toLowerCase() === "delete" || args[0].toLowerCase() === "d") {
                        //Vérifications classiques
                        if (!message.member.roles.has("583766594027651082")) return message.channel.send(PermEmbed);
                        if (!message.channel.name.startsWith(`「📨」ticket-`)) return message.channel.send(ErrorCloseEmbed);

                        // Confirmation
                        let msg = await message.channel.send(ConfirmEmbed);
                        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 9000 });
                        collector.on('collect', message => {
                            if (message.content.toLowerCase() == "w/yes") {
                                message.channel.send("**<a:Typing:635137206796681253> Supression dans quelques secondes...**");
                                setTimeout(function () {
                                    const DelLogEmbed = new Discord.RichEmbed()
                                        .setColor("PURPLE")
                                        .setTitle(":envelope_with_arrow: TICKET LOGS")
                                        .addField(":clock1: Date de l'action :", date.format("LLLL"))
                                        .setDescription(
                                            `Le ticket au nom \`${message.channel.name}\` a été supprimé par ${message.author}.`
                                        )
                                        .setAuthor(
                                            message.author.tag,
                                            message.author.displayAvatarURL
                                        )
                                        .setTimestamp()
                                        .setFooter("WalibiBot", message.guild.iconURL);

                                    client.channels
                                        .get("616991454824235048")
                                        .send(DelLogEmbed)
                                    message.channel.delete();
                                }, 10000);
                                //Anulation du ticket
                            } else if (message.content.toLowerCase() == "w/no") {
                                return message.channel.send(StopEmbed);
                            }
                        })
                        collector.on('end', message => {
                            if (!message.content) {
                                const TimeEmbed = new Discord.RichEmbed()
                                    .setColor("RED")
                                    .setDescription(
                                        "Vous avez mis trop de temps a confirmer la fermeture, l'action est donc annulée :x:"
                                    )
                                    .setAuthor(author.tag, author.displayAvatarURL)
                                    .setTimestamp()
                                    .setFooter("WalibiBot", guild.iconURL);
                                msg.edit(TimeEmbed)
                            }
                        });
                    } else {
                        //Argument inconnu
                        if (args[0]) {
                            message.delete();
                            message.channel.send(NoArgEmbed).then(msg => {
                                msg.delete(10000);
                            });
                        }
                    }
    }
}

module.exports = Ticket;