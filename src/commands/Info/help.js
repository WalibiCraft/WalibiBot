const Command = require('../../structures/Command');

const { stripIndents } = require("common-tags");

class Help extends Command {
  constructor(...args) {
    super({
      description: "Afficher la liste des commandes disponibles du bot WalibiBot",
      usage: ["w/help", "w/help [commande]"],
      examples: ["w/help", "w/help ping"],
      cooldown: 1000,
      aliases: ["h", "list", "commands", "aide", "command", "commande"],
      guildOnly: true,
      args: [
        {
          key: 'command',
          required: false
        }
      ]
    }, ...args);
  }

  async execute(message, args) {
    if (args.command) {
      const cmd = this.client.commands.fetch(args.command);

      if (!cmd) {
        return message.channel.send(
          embed
            .setColor("RED")
            .setDescription("Je n'ai trouvé aucune information pour la commande `" + args.command + "` :x:\nListe des commandes obtenable avec la commande `e/help` :bulb:")
            .setTimestamp()
            .setFooter("WalibiBot", message.guild.iconURL())
        );
      }

      const examples = [this.client.config.prefix + cmd.name];
      cmd.examples.map((example) => examples.push(`${this.client.config.prefix + cmd.name} ${example}`));

      const embed = new Discord.MessageEmbed()
        .setAuthor(":bulb: INFO")
        .setFooter("WalibiBot", message.guild.iconURL())
        .setDescription("Rappel de la syntaxe : `<>` = Argument obligatoire / `[]` = Argument facultatif")
        .setColor("17ace8")
        .setTimestamp()
        .setTitle(":handshake: HELP")
        .addField("Aide pour la commande", `${this.client.config.prefix}${cmd.name}`)
        .addField("— Description", `\`\`\`${cmd.description}\`\`\``)
        .addField("— Usage", `\`\`\`${this.client.config.prefix + cmd.usage.join('\n- ')}\`\`\``)
        .addField("— Exemples", `\`\`\`- ${examples.join('\n- ')}\`\`\``)
        .addField("— Alias", `\`\`\`- ${cmd.aliases.length > 0 ? cmd.aliases.join('\n- ') : 'Aucun alias'}\`\`\``);

      return message.channel.send(embed);
    }

    const categories = [];

    this.client.commands.forEach((command) => {
      if (!categories.includes(command.category)) {
        categories.push(command.category);
      }
    });

    const embed = {
      description: `● Pour obtenir de l'aide sur une des commandes, tappez \`${this.client.config.prefix}help [commande]\`!`,
      fields: []
    };

    categories.sort().forEach((group) => {
      const commands = this.client.commands.array().filter(({ category }) => category === group);

      embed.fields.push(
        {
          name: `${categories} (${commands.length})`,
          value: `\`\`\`\u200B${commands.map(({ name }) => name).join(', ')}\`\`\``
        }
      );
    });

    message.channel.send({ embed });
  }
};

module.exports = Help;