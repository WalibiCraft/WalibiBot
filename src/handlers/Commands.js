const { Collection } = require('discord.js');
const { join, parse } = require('path');
const klaw = require('klaw');

class CommandHandler extends Collection {
  constructor(client) {
    super();

    /**
     * The client instance.
     * @type {Client}
     */
    this.client = client;
  }

  load(path = join(__dirname, '..', 'commands')) {
    return new Promise((resolve) => {
      const start = Date.now();

      klaw(path)
        .on('data', (item) => {
          const file = parse(item.path);
          if (file.ext !== '.js') return;

          const command = this.register(file);

          if (command) {
            if(command.enabled == false) return;
            this.set(file.name, command);
          }
        })
        .on('end', () => {
          if (this.size === 0) {
            this.client.logger.warn('No command were found!');
            return resolve(this);
          }

          this.client.logger.info(`Loaded ${this.size} commands in ${Date.now() - start}ms.`);
          return resolve(this);
        });
    });
  }

  fetch(name) {
    // TODO: Upgrade the getters
    if (this.has(name)) return this.get(name);
    const alias = this.find((c) => c.aliases && c.aliases.includes(name));
    if (alias) return alias;
  }

  register(file) {
    // eslint-disable-next-line
    const Command = require(join(file.dir, file.base));

    try {
      const command = new Command(this.client, file.name, join(file.dir, file.base));

      return command;
    } catch (err) {
      if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
        console.log(err)
      } else {
        this.client.logger.error(err);
      }
    }
  }

  reload(command) {
    delete require.cache[command.path];

    const file = this.register(command.path);
    this.set(file.name, file);
  }
}

module.exports = CommandHandler;
