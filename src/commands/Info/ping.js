const fetch = require('node-fetch');
const Command = require('../../structures/Command');

const url = 'https://srhpyqt94yxb.statuspage.io/api/v2/summary.json';

const components = [
  ['CloudFlare'], ['Voice'],
  ['API'], ['Tax Calculation Service'],
  ['Gateway'], ['Push Notifications'],
  ['Media Proxy'], ['Third-party'],
  ['EU West'], ['US West'],
  ['EU Central'], ['Brazil'],
  ['Singapore'], ['Hong Kong'],
  ['Sydney'], ['Russia'],
  ['US Central'], ['Japan'],
  ['US East'], ['South Africa'],
  ['US South']
];

class Ping extends Command {
  constructor(...args) {
    super({
      description: 'Send test packets to the bot, and measures the response time, also, display information from the statuspage api about server & service states.',
      usage: 'ping',
      cooldown: 5000,
      aliases: ['🏓', 'pong']
    }, ...args);
  }

  async execute(message) {
    const embed = {
      title: 'P O N G !',
      color: 0x7354f6,
      fields: [{
        name: '— Client',
        value: [
          '```',
          `   Latency │ ${Date.now() - message.createdTimestamp}ms`,
          ` Websocket │ ${this.client.ws.ping}ms`,
          '```'
        ].join('\n')
      }]
    };

    try {
      const data = await (await fetch(url)).json();

      components.map((c, i) => {
        const res = data.components.find((x) => x.name === c[0]);
        components[i][1] = res && res.status === 'operational' ? '✔' : '✗';
        return res;
      });

      embed.fields.push({
        name: '— Services',
        value: [
          '```',
          `CloudFlare │ ${[components[0][1]]} : ${[components[1][1]]} │ Voice`,
          `       API │ ${[components[2][1]]} : ${[components[3][1]]} │ Tax Calc`,
          `   Gateway │ ${[components[4][1]]} : ${[components[5][1]]} │ Push Notif`,
          `Med. Proxy │ ${[components[6][1]]} : ${[components[7][1]]} │ Third-party`,
          '```'
        ].join('\n')
      }, {
        name: '— Servers Status',
        value: [
          '```',
          `   EU West │ ${[components[8][1]]} : ${[components[9][1]]} │ US West`,
          `EU Central │ ${[components[10][1]]} : ${[components[11][1]]} │ Brazil`,
          ` Singapore │ ${[components[12][1]]} : ${[components[13][1]]} │ Hong Kong`,
          `    Sydney │ ${[components[14][1]]} : ${[components[15][1]]} │ Russia`,
          `US Central │ ${[components[16][1]]} : ${[components[17][1]]} │ Japan`,
          `   US East │ ${[components[18][1]]} : ${[components[19][1]]} │ South Afr`,
          `  US South │ ${[components[20][1]]} :   │ `,
          '```'
        ].join('\n')
      }, {
        name: '— Maintenance & Incidents',
        value: `\`\`\`${data.incidents ? 'ok' : data.incidents}\`\`\``
      });
    } catch (err) { console.log(err); }

    message.channel.send({ embed });
  }
}

module.exports = Ping;
