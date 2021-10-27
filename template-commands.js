const Command = require('../../structures/Command');

class Name extends Command {
  constructor(...args) {
    super({
      description: "",
      usage: [""],
      examples: [""],
      cooldown: 1000,
      aliases: [""],
      guildOnly: true,
      enabled: true,
      args: [
        {
        }
      ]
    }, ...args);
  }

  async execute(message, args) {
  };
}
//module.exports = Name
