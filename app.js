// eslint-disable-next-line import/newline-after-import
const insta = require('./src/utils/instagram');
const Bot = require('./src/');
const bot = new Bot();

bot.commands.load();
bot.events.load();
insta.startInstagramChecking()