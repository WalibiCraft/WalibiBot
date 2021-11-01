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
            return message.guild.channels.cache
                .get("722842725178933249")
                .setName("「👥」Membres : 7" + message.guild.memberCount);
        }
        Membres()
    }
}
module.exports = Test