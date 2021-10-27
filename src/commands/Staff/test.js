const Command = require('../../structures/Command');
class Test extends Command {
    constructor(...args) {
        super({
            description: "Commande de test",
            usage: "",
            examples: [""],
            cooldown: 1000,
            guildOnly: true,
            enabled: false,
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