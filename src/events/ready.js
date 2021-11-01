const { existsSync, createWriteStream } = require('fs');
const os = require('os');
const figlet = require('figlet');
const fetch = require('node-fetch');

const Event = require('../structures/Event');
const { chown } = require('fs/promises');
const DiscordVoice = require('@discordjs/voice')

const update = function updateStatus(cl) {
  const { status, games, interval } = {
    status: 'online', // https://discord.js.org/#/docs/main/stable/typedef/PresenceStatusData
    games: [
      {
        name: 'w/help | WalibiCraft 🎡',
        type: 'PLAYING' // https://discord.js.org/#/docs/main/stable/typedef/ActivityType
      },
      {
        name: cl.guilds.cache.get("583756963586768897").memberCount + ' Membres 👀',
        type: 'WATCHING' // https://discord.js.org/#/docs/main/stable/typedef/ActivityType
      }
    ],
    interval: 1000
  };

  // Set default presence
  if (games instanceof Array && games.length > 0) {
    cl.user.setPresence({
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
      cl.user.setActivity(games[index].name, {
        type: games[index].type,
        url: games[index].url || 'https://www.twitch.tv/'
      });
    }, ((typeof interval === 'number' && interval) || 30));
  }
}

class Ready extends Event {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args);
  }

  async execute() {
    const { client } = this;

    client.logger.ipc(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    client.logger.ipc(`${client.user.tag} is online, hosted by ${os.hostname()}`);
    //Console
    figlet('WalibiBot', {
      width: 100,
    }, function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data)
    });

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
    updateStatus(client)

    //Connexion au channel
    DiscordVoice.joinVoiceChannel({
      channelId: "722842846146592909",
      guildId: "583756963586768897",
      adapterCreator: client.guilds.cache.get("583756963586768897").voiceAdapterCreator,
    });
  }
}



module.exports = { Ready };
