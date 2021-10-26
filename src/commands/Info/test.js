const Command = require('../../structures/Command');
class Test extends Command {
    constructor(...args) {
        super({
            description: "Poste votre idée mise en forme dans le channel, <#606836989458776074> afin que votre propositions soit examinée par tout le serveur",
            usage: "e/suggest <proposition>",
            examples: ["e/suggest Mettre en place un nouveau grade", "e/suggest Améliorer l'attraction n°1"],
            cooldown: 1000,
            guildOnly: true,
        }, ...args);
    }

    async execute(message, args) {
        function Membres() {
            return console.log(message.guild.memberCount + "membres ! :eyes:")
        }
        Membres()
    }
}
module.exports = Test