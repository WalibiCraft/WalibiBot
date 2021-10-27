const { existsSync, createWriteStream } = require('fs');
const os = require('os');
const fetch = require('node-fetch');

const Event = require('../structures/Event');

class Ready extends Event {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args);
  }

  async execute() {
    const { client } = this;

    client.logger.ipc(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    client.logger.ipc(`${client.user.tag} is online, hosted by ${os.hostname()}`);

    // Setting up the bot name
    client.user.setUsername(client.config.name)
      .catch(() => { });

    // Setting up the bot avatar
    const avatar = 'assets/avatar.png';

    if (client.config.avatar && !existsSync(avatar)) {
      const stream = createWriteStream(avatar);

      fetch(client.config.avatar)
        .then((res) => {
          res.body.pipe(stream);
        })
        .catch(() => { });

      stream.on('finish', () => {
        client.user.setAvatar(avatar)
          .catch(() => { });
      });
    }

    if (existsSync(avatar)) {
      client.user.setAvatar(avatar)
        .catch(() => { });
    }

    const { status, games, interval } = client.config.presence;

    if (games instanceof Array && games.length > 0) {
      // Set default presence
      client.user.setPresence({
        status,
        activity: {
          name: games[0].name,
          type: games[0].type,
          url: games[0].url || 'https://www.twitch.tv/'
        }
      });

      setInterval(() => {
        // Redefined the bot's activity
        const index = Math.floor(Math.random() * (games.length));
        client.user.setActivity(games[index].name, {
          type: games[index].type,
          url: games[index].url || 'https://www.twitch.tv/'
        });
      }, ((typeof interval === 'number' && interval) || 30));
    }
  }
}

module.exports = Ready;