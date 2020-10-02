const { sep } = require('path');

class Command {
  constructor({
    name,
    category,
    enabled = true,
    aliases = [],
    description = 'No information specified.',
    usage = 'No usage specified',
    examples = [],
    cooldown = 0,
    guildOnly = true,
    clientPermissions = [],
    userPermissions = [],
    nsfw = false,
    args = []
  }, client, file, path) {
    /**
     * The client instance.
     * @type {Client}
     */
    this.client = client;

    /**
     * Name of this command.
     * @type {String}
     */
    this.name = name || file;

    /**
     * Path to this command file.
     */
    this.path = path;

    /**
     * Name of the category the command belong to.
     * @type {String}
     */
    this.category = category || path.split(sep)[parseInt(path.split(sep).length - 2, 10)];

    /**
     * Wether the command is enable or not.
     */
    this.enabled = enabled;

    /**
     * Aliases for this command.
     * @type {String[]}
     */
    this.aliases = aliases;

    /**
     * Description of this command.
     * @type {String}
     */
    this.description = description;

    /**
     * Usage of this command
     * @type {String}
     */
    this.usage = usage;

    /**
     * Example usage of this command.
     * @type {String[]}
     */
    this.examples = examples;

    /**
     * Cooldown for this command.
     * @type {Number}
     */
    this.cooldown = cooldown;

    /**
     * Whether the command can ony be run in a guild channel
     * @type {Boolean}
     */
    this.guildOnly = guildOnly;

    /**
     * Permissions required by the client to use the command.
     * @type {PermissionResolvable[]}
     */
    this.clientPermissions = clientPermissions;

    /**
     * Permissions required by the user to use the command.
     * @type {PermissionResolvable[]}
     */
    this.userPermissions = userPermissions;

    /**
     * Whether the command can only be used in NSFW channels.
     * @type {Boolean}
     */
    this.nsfw = nsfw;

    /**
     * The arguments required for this command.
     * @type {Object}
     */
    this.args = args;

    /**
     * The cooldowns map.
     * @type {Map}
     */
    this._cooldown = new Map();
  }

  async run() {
    throw new Error(`${this.constructor.name} doesn't have a run() method.`);
  }

  setCooldown(user) {
    this._cooldown.set(user, Date.now() + this.cooldown);

    setTimeout(() => {
      this._cooldown.delete(user);
    }, this.cooldown);
  }

  /*
  validate(message) {
    if (!this.enabled) {
      return false;
    }

    if (this.guilOnly && !message.guild) {
      message.author.send(`The \`${this.name}\` command must be used in a server channel.`);
      return false;
    }

    if (this.nsfw && !message.channel.nsfw) {
      message.channel.send(`The \`${this.name}\` command can only be used in NSFW channels.`);
      return false;
    }

    if (this.userPermissions.length !== 0) {
      if (message.channel.type === 'text') {
        const missing = this.userPermissions.filter((perm) => !message.channel.permissionsFor(message.author).has(perm));

        if (missing.length > 0) {
          message.channel.send(`The \`${this.name}\` command requires you to have the following permissions: ${missing.map((perm) => perm.join(', '))}`);
          return false;
        }
      }
    }

    if (this.clientPermissions.length !== 0) {
      if (message.channel.type === 'text') {
        const missing = this.clientPermissions.filter((perm) => !message.channel.permissionsFor(message.guild.me).has(perm));

        if (missing.length > 0) {
          message.channel.send(`I need the following permissions for the \`${this.name}\` command to work: ${missing.map((perm) => perm.join(', '))}`);
          return false;
        }
      }
    }

    if (this.cooldown !== 0) {
      const cooldown = this.cooldowns.get(message.author.id);

      if (cooldown) {
        return false;
      }
    }

    // TODO: check args
    // TODO: Add cooldown and add cooldown message with time from commando
    return true;
  }

  hasPermission(message) {
    if (this.userPermissions.length === 0) {
      return true;
    }

    if (message.channel.type === 'text') {
      const missing = this.userPermissions.filter((perm) => !message.channel.permissionsFor(message.author).has(perm));

      if (missing.length > 0) {
        message.channel.send(`The \`${this.name}\` command requires you to have the following permissions: ${missing.map((perm) => perm.join(', '))}`);
        return false;
      }
    }

    return true;
  }

  hasCooldown(userID) {
    if (!this.cooldowns) {
      return false;
    }

    const cooldown = this.cooldowns.get(userID);
    if (!cooldown) {
      return false;
    }

    if (this.cooldown.usages && cooldown.usages < this.cooldown.usages) {
      cooldown.usages += 1;
      return false;
    }

    return true;
  }

  setCooldown(userID) {
    if (!this.cooldowns) {
      return null;
    }

    let cooldown = this.cooldowns.get(userID);
    if (!cooldown) {
      cooldown = {
        start: Date.now(),
        usages: 0,
        timeout: this.client.setTimeout(() => {
          this.cooldowns.remove(userID);
        }, this.cooldown.duration * 1000)
      };
    }

    return cooldown;
  } */
}

module.exports = Command;
