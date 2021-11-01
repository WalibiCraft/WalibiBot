const { Collection } = require('discord.js');
const { join, parse } = require('path');
const klaw = require('klaw');

class EventHandler extends Collection {
  constructor(client) {
    super();

    /**
     * The client instance.
     * @type {Client}
     */
    this.client = client;
  }

  load(path = join(__dirname, '..', 'events')) {
    return new Promise((resolve) => {
      const start = Date.now();

      klaw(path)
        .on('data', (item) => {
          const file = parse(item.path);
          if (file.ext !== '.js') return;

          const event = this.register(file);

          if (event) {
            this.setListener(event);
            this.set(file.name, event);
          }
        })
        .on('end', () => {
          if (this.size === 0) {
            this.client.logger.warn('No event were found!');
            return resolve(this);
          }

          this.client.logger.info(`Loaded ${this.size} events in ${Date.now() - start}ms.`);
          return resolve(this);
        });
    });
  }

  fetch(name) {
    // TODO: Upgrade the getters
    if (this.has(name)) return this.get(name);
    const alias = this.find((c) => c.aliases.includes(name));
    if (alias) return alias;
  }

  register(file) {
    // eslint-disable-next-line
    const Event = require(join(file.dir, file.base));

    try {
      const event = new Event(this.client, file.name);

      return event;
    } catch (err) {
      if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
        console.log(err)
      } else {
        this.client.logger.error(err);
        this.client.guilds.cache.get("583756963586768897").channels.cache.get("903424661533118464").send(err)
      }
      
    }
  }

  reload(event) {
    delete require.cache[event.path];

    const file = this.register(event.path);
    this.set(file.name, file);
  }

  setListener(event) {
    this.client[event.once ? 'once' : 'on'](event.name, (...args) => event.execute(...args));
  }
}

module.exports = EventHandler;
