const Bot = require('./src');
//const bot = new Bot();
console.log(this.client)
module.exports = {
    name: 'WalibiBot',
    avatar: 'https://cdn.discordapp.com/attachments/631488622436024335/764268322400763954/logo_discord_reonter_encore.png',
    prefix: 'w/',
    presence: {
      status: 'online', // https://discord.js.org/#/docs/main/stable/typedef/PresenceStatusData
      games: [
        {
          name: 'w/help | WalibiCraft 🎡',
          type: 'PLAYING' // https://discord.js.org/#/docs/main/stable/typedef/ActivityType
        },
        {
          name: 'X Membres',
          type: 'WATCHING' // https://discord.js.org/#/docs/main/stable/typedef/ActivityType
        }
      ],
      interval: 1000
    },
    token: 'NjA0NjczMTc4Mjc4NTU5NzQ5.XTxXxw.mZ4lsooAZTou-w17OWrOKomvXIs'
  }


  

