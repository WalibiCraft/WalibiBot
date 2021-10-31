// eslint-disable-next-line import/newline-after-import
const Bot = require('./src');
const bot = new Bot();

bot.commands.load();
bot.events.load();
