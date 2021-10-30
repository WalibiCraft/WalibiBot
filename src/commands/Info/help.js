const Discord = require('discord.js');
const Command = require('../../structures/Command');

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
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription("Je n'ai trouvé aucune information pour la commande `" + args.command + "` :x:\nListe des commandes obtenable avec la commande `e/help` :bulb:")
          .setTimestamp()
          .setFooter("WalibiBot", message.guild.iconURL())
        return message.reply({embeds: [embed]});
      }

      const examples = [this.client.config.prefix + cmd.name];
      cmd.examples.map((example) => examples.push(`${this.client.config.prefix + cmd.name} ${example}`));

      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setFooter("WalibiBot", message.guild.iconURL())
        .setDescription(`Aide pour la commande : **${this.client.config.prefix}${cmd.name}** \nSyntaxe : \`<>\` = Argument obligatoire / \`[]\` = Argument facultatif`)
        .setColor("17ace8")
        .setTimestamp()
        .setTitle(":bulb: INFO")
        .addField("— Description", `\`\`\`${cmd.description}\`\`\``)
        .addField("— Usage", `\`\`\`${"- " + cmd.usage.join('\n- ')}\`\`\``)
        .addField("— Exemples", `\`\`\`${"- " + cmd.examples.join('\n- ')}\`\`\``)
        .addField("— Alias", `\`\`\`- ${cmd.aliases != "" ? this.client.config.prefix + cmd.aliases.join('\n- ' + this.client.config.prefix) : 'Aucun alias'}\`\`\``);
      return message.reply({ embeds: [embed] });
    }

    const categories = [];

    this.client.commands.forEach((command) => {
      if (!categories.includes(command.category)) {
        categories.push(command.category);
      }
    });

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle(":handshake: HELP")
      .setDescription(`Voici la liste des commandes de WalibiBot :robot: \nLe préfix à utiliser avant chaque commande est \`${this.client.config.prefix}\[commande]\`. \nPour obtenir de l'aide sur une commande spécifique, tappez \`${this.client.config.prefix}help [commande]\`.`)
      .setColor("17ace8")
      .setFields([])
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL());

    categories.sort().forEach((group) => {
      const commands = [...this.client.commands.values()].filter(({ category }) => category === group);;

      embed.fields.push(
        {
          name: `${categories} (${commands.length})`,
          value: `\`\`\`\u200B${commands.map(({ name }) => name).join(', ')}\`\`\``
        }
      );
    });

    message.reply({ embeds: [embed] });
  }
};

module.exports = Help;