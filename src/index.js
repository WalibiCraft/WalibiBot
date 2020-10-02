const { Client } = require('discord.js');

const config = require('../config');
const { version } = require('../package.json');

const Logger = require('./utils/Logger');
const CommandHandler = require('./handlers/Commands');
const EventHandler = require('./handlers/Events');
const User = require('./arguments/User');

/**
 * Represents the instance of the bot, an extension of Discord Client.
 */
class Bot extends Client {
  constructor(options) {
    /* Initialise discord.js client */
    super(options);

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
      .on('error', (err) => this.logger.error(err))
      .on('warn', (info) => this.logger.warn(info));

    process
      .on('unhandledRejection', (err) => this.logger.error(err));
  }
}

module.exports = Bot;
