// eslint-disable-next-line import/newline-after-import
const Bot = require('./src');
const bot = new Bot();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config');
const fs = require('fs');

bot.commands.load();
bot.events.load();