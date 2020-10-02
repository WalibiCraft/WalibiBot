const Event = require('../structures/Event');

class Message extends Event {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args);
  }

  async execute(message) {
    const { client } = this;

    if (message.author.bot || message.system) return;
    if (!message.member && message.guild) message.member = await message.guild.members.fetch(message.author);
    if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/\s+/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.fetch(command);

    if (!cmd || !cmd.enabled) return;

    if (cmd.guildOnly && !message.guild) {
      return message.author.send('This command cannot be executed as a direct message.');
    }

    if (cmd.nsfw && !message.channel.nsfw) {
      return message.channel.send('This command can only be used in NSFW channels.');
    }

    const userPermissions = cmd.userPermissions.filter((perm) => !message.channel.permissionsFor(message.author).has(perm));
    if (userPermissions.length > 0) {
      return message.channel.send(`This command requires you to have the following permissions: ${userPermissions.join(', ')}`);
    }

    const clientPermissions = cmd.clientPermissions.filter((perm) => !message.channel.permissionsFor(message.guild.me).has(perm));
    if (clientPermissions.length > 0) {
      return message.channel.send(`I need the following permissions to run this command: ${clientPermissions.join(', ')}`);
    }

    if (cmd._cooldown.has(message.author.id)) {
      return message.delete()
          && message.reply(`Please wait ${((cmd._cooldown.get(message.author.id) - Date.now()) / 1000).toFixed(1)} second(s) to reuse the ${cmd.name} command.`);
    }

    if (cmd.cooldown) {
      cmd._cooldown.set(message.author.id, Date.now() + cmd.cooldown);
      this.client.setTimeout(() => {
        cmd._cooldown.delete(message.author.id);
      }, cmd.cooldown);
    }

    const options = {};

    if (cmd.args && typeof cmd.args === 'object') {
      for (let i = 0; i < cmd.args.length; i += 1) {
        const { key, type, default: _default, required = true, validate } = cmd.args[i];

        if (!args[i]) {
          if (required) {
            return message.channel.send(`You didn't provide correct arguments, for more information use the following command: \`/help ${cmd.name}\``);
          }

          if (_default) {
            args[i] = _default;
          }
        }

        if (type) {
          args[i] = await client.arguments.validate(args[i]);

          if (!args[i]) {
            return message.channel.send(`You didn't provide correct arguments, for more information use the following command: \`/help ${cmd.name}\``);
          }
        }

        if (validate) {
          try {
            const result = validate(args[i]);

            if (!result) {
              return message.channel.send(`You didn't provide correct arguments, for more information use the following command: \`/help ${cmd.name}\``);
            }
          } catch (err) {
            client.logger.error(err);
          }
        }

        options[key] = args[i];
      }
    }

    try {
      cmd.execute(message, options);
    } catch (err) {
      this.client.logger.error(err);
    }
  }
}

module.exports = Message;
