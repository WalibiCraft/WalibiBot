const Command = require('../../structures/Command');

class Avatar extends Command {
  constructor(...args) {
    super({
      description: 'Show commands list or informations about a command.',
      usage: 'help (command)',
      examples: ['ping'],
      cooldown: 1000,
      aliases: ['info'],
      guildOnly: false,
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
        return message.channel.send`No command found for: ${args.command}`;
      }
      const examples = [this.client.config.prefix + cmd.name];
      cmd.examples.map((example) => examples.push(`${this.client.config.prefix + cmd.name} ${example}`));

      const embed = {
        author: `Help for ${this.client.config.prefix}${cmd.name}`,
        fields: [
          {
            name: '— Description',
            value: `\`\`\`${cmd.description}\`\`\``
          },
          {
            name: '— Usage',
            value: `\`\`\`${this.client.config.prefix + cmd.usage}\`\`\``
          },
          {
            name: '— Examples',
            value: `\`\`\`- ${examples.join('\n- ')}\`\`\``
          },
          {
            name: '— Alias',
            value: `\`\`\`- ${cmd.aliases.length > 0 ? cmd.aliases.join('\n- ') : 'No alias'}\`\`\``
          }
        ]
      };

      return message.channel.send({ embed });
    }

    const categories = [];

    this.client.commands.forEach((command) => {
      if (!categories.includes(command.category)) {
        categories.push(command.category);
      }
    });

    const embed = {
      description: `● To get help on an command type \`${this.client.config.prefix}help <command>\`!`,
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
}

module.exports = Avatar;
