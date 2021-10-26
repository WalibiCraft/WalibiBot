//Init bot
const { Client, Intents } = require('discord.js');
const config = require('../config');
const { version } = require('../package.json');
const Logger = require('./utils/Logger');
const CommandHandler = require('./handlers/Commands');
const EventHandler = require('./handlers/Events');
const User = require('./arguments/User');

//Init Intents (discord.js v13)
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);

/**
 * Represents the instance of the bot, an extension of Discord Client.
 */
class Bot extends Client {
  constructor() {
    /* Initialise discord.js client */
    super(({ intents: myIntents }));

    this.config = config;
    this.version = version;

    /* Initialise logger and spinner */
    this.logger = new Logger();

    /* Inform the user that the client has been initialised */
    this.logger.info(`Client initialised. —— Node ${process.version}.`);

    /* Connect to the discord API */
    super.login(this.config.token);

    /* Handlers */
    this.commands = new CommandHandler(this);
    this.events = new EventHandler(this);
    this.arguments = new User(this, 'foo');

    /* Log debug information during development */
    super.on('debug', (message) => {
      if (message.toLowerCase().includes('heartbeat')) {
        return;
      }

      this.logger.debug(message);
    });

    super
      .on('disconnect', () => this.logger.warn('Bot is disconnecting...'))
      .on('reconnecting', () => this.logger.log('Bot reconnecting...'))
      .on('error', (err) => {
        if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
          console.log(err)
        } else {
          this.logger.error(err);
        }
      })
      .on('warn', (info) => this.logger.warn(info));

    process
      .on('unhandledRejection', (err) => {
        if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
          console.log(err)
        } else {
          this.logger.error(err);
        }
      })
  }
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}


module.exports = Bot;
