const Event = require('../structures/Event');
const Discord = require('discord.js')

class Message extends Event {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args);
  }

  async execute(message) {
    const { client } = this;

    if (message.channel.id === "722838096000974909") {
      if (!message.author.bot) {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
          if (!message.content.toLowerCase().includes("w/bvn")) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setDescription(
                "Vous n'avez pas le droit de discuter dans ce channel :x: \nUtilisez uniquement `w/bvn` pour souhaiter la bienvenue :octagonal_sign:"
              )
              .setTimestamp()
              .setFooter("WalibiBot", message.guild.iconURL());
            message.reply({ embeds: [errorembed] }).then(msg => {
              setTimeout(() => msg.delete(), 10000);
              setTimeout(() => message.delete(), 10000);
            })
          }
        }
      }
    } else if (message.channel.id === "616994843603763213") {
      if (!message.author.bot) {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
          if (!message.content.toLowerCase().includes("w/ticket new")) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(
                "Vous n'avez pas le droit de discuter dans ce channel :x: \nUtilisez uniquement `w/ticket new <raison>` pour ouvrir un ticket :octagonal_sign:"
              )
              .setTimestamp()
              .setFooter("WalibiBot", message.guild.iconURL);
            message.reply({ embeds: [errorembed] }).then(msg => {
              setTimeout(() => msg.delete(), 10000);
              setTimeout(() => message.delete(), 10000);
            })
          };
        }
      }
    } else {

      const args = message.content.slice(client.config.prefix.length).trim().split(/\s+/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.fetch(command);

      if (message.author.bot || message.system) return;
      if (!message.member && message.guild) message.member = await message.guild.members.fetch(message.author);
      if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;
      if (message.content.toLowerCase().startsWith("w/yes") || message.content.toLowerCase().startsWith("w/no")) return;

      const HelpEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Cette commande n'existe pas ! :x: \nEssayez plutôt `w/help` pour avoir la liste des commandes :bulb:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      if (!cmd || !cmd.enabled) {
        return message.reply({ embeds: [HelpEmbed] });
      }

      //Déclaration des Embed
      const PermEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Vous n'avez pas l'autorisation de faire ça, bien tenté ! :x:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      const ArgsEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Les arguments que vous avez précisé ne sont pas valides ! :x: \nPlus d'information avec la commande `w/help " + cmd.name + "` :bulb:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      const MpEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Cette commande ne fonctionne pas en message privés :x: \nEssayez plutôt dans le channel `「🤖」commandes` :bulb:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());


      const NSFWEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Cette commande ne fonctionne que dans les channels NSFW :x:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      const ClientPermEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Je n'ai pas l'autorisation de réaliser cette action :x:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      const CooldownEmbed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setDescription(
          "Cette commande est soumise à un cooldown, veuillez patienter encore " + ((cmd._cooldown.get(message.author.id) - Date.now()) / 1000).toFixed(1) + " :hourglass_flowing_sand:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL());

      if (cmd.guildOnly && message.channel instanceof Discord.DMChannel && message.author.id !== '604673178278559749') {
        return message.author.send({ embeds: [MpEmbed] });
      }

      if (cmd.nsfw && !message.channel.nsfw) {
        return message.reply({ embeds: [NSFWEmbed] });
      }

      const userPermissions = cmd.userPermissions.filter((perm) => !message.channel.permissionsFor(message.author).has(perm));
      if (userPermissions.length > 0) {
        return message.reply({ embeds: [PermEmbed] });
      }

      const clientPermissions = cmd.clientPermissions.filter((perm) => !message.channel.permissionsFor(message.guild.me).has(perm));
      if (clientPermissions.length > 0) {
        return message.reply({ embeds: [ClientPermEmbed] });
      }

      if (cmd._cooldown.has(message.author.id)) {
        return message.reply({ embeds: [CooldownEmbed] });
      }

      if (cmd.cooldown) {
        cmd._cooldown.set(message.author.id, Date.now() + cmd.cooldown);
        cmd._cooldown.delete(message.author.id);
      }

      const options = {};

      if (cmd.args && typeof cmd.args === 'object') {
        for (let i = 0; i < cmd.args.length; i += 1) {
          const { key, type, default: _default, required = true, validate } = cmd.args[i];

          if (!args[i]) {
            if (required) {
              return message.reply({ embeds: [ArgsEmbed] });
            }

            if (_default) {
              args[i] = _default;
            }
          }

          if (type) {
            args[i] = await client.arguments.validate(args[i]);

            if (!args[i]) {
              return message.reply({ embeds: [ArgsEmbed] });
            }
          }

          if (validate) {
            try {
              const result = validate(args[i]);

              if (!result) {
                return message.reply({ embeds: [ArgsEmbed] });
              }
            } catch (err) {
              if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
                console.log(err)
              } else {
                this.client.logger.error(err);
                //this.client.guilds.cache.get("583756963586768897").channels.cache.get("903424661533118464").send(err)
              }
            }
          }

          options[key] = args[i];
        }
      }

      try {
        cmd.execute(message, options);
      } catch (err) {
        if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
          console.log(err)
        } else {
          this.client.logger.error(err);
          //this.client.guilds.cache.get("583756963586768897").channels.cache.get("903424661533118464").send(err)
        }
      }
    }
  }
}


module.exports = Message;
