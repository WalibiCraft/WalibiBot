
const moment = require('moment');
const chalk = require('chalk');

const config = require('../../config');

class Logger {
  constructor() {
    moment.locale(config.timezone);
  }

  debug(message) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
      return this.log('debug', message);
    }
  }

  info(message) {
    return this.log('info', message);
  }

  warn(message) {
    return this.log('warn', message);
  }

  error(message) {
    return this.log('error', message);
  }

  ipc(message) {
    return this.log('ipc', message);
  }

  log(type, message) {
    return console.log(`${chalk.rgb(100, 100, 100)(`[${this.date()}]`)} - ${this.color(type)} - ${chalk.rgb(150, 150, 150)(message)}`);
  }

  date() {
    return moment().format('D MMM YYYY HH:mm:ss');
  }

  color(type) {
    switch (type.toLowerCase()) {
      case 'debug':
        return chalk.bold.green(type.toUpperCase());
      case 'info':
        return chalk.bold.cyan(type.toUpperCase());
      case 'warn':
        return chalk.bold.yellow(type.toUpperCase());
      case 'error':
        return chalk.bold.rgb(255, 85, 85)(type.toUpperCase());
      case 'ipc':
        return chalk.bold.rgb(138, 43, 226)(type.toUpperCase());
      default:
        throw new TypeError('Log type must be either debug, info, warn, error or ipc.');
    }
  }
}

module.exports = Logger;
