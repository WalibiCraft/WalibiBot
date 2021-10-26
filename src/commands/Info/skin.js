const fetch = require("node-fetch");
const Command = require('../../structures/Command');
class Skin extends Command {
  constructor(...args) {
    super({
      description: "Génére un aperçu du skin Minecraft du pseudo précisé",
      usage: "e/skin <Pseudo Minecraft / UUID>",
      examples: ["e/skin MegaQLF","e/skin Rakox"],
      cooldown: 1000,
      aliases: ["mc", "mcskin", "minecraft"],
      guildOnly: true,
    }, ...args);
  }
  async execute(message, args) {
    const PseudoEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Vous devez préciser un nom d'utilisateur Minecraft :x: \nPlus d'informations avec la commande `w/help <Commande>` :bulb:"
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

    const InvalidPseudoEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Le pseudo `" +
        args +
        "` n'est pas valide :x: \nPlus d'informations avec la commande `w/help <Commande>` :bulb:"
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

    if (!args[0]) return message.channel.send(PseudoEmbed);
    const content = message.content.trim().split(/ +/g);
    const user = content.slice(1).join(" ");

    const msg = await message.channel.send(`**<a:Typing:635137206796681253> Chargement en cours...**`);

    fetch(`https://some-random-api.ml/mc?username=${user}`)
      .then(res => res.json())
      .then(body => {
        if (!body || !body.trimmed_uuid)
          return message.channel.send(InvalidPseudoEmbed);

        const uuid = body.trimmed_uuid;

        const embed = new Discord.MessageEmbed()
          .setColor("17ace8")
          .setTitle(":bust_in_silhouette: AVATAR")
          .setDescription(
            `\n[Télécharger le skin](https://visage.surgeplay.com/skin/${uuid}.png)`
          )
          .setTimestamp()
          .setImage(`https://visage.surgeplay.com/full/512/${uuid}.png`)
          .setFooter("WalibiBot", message.guild.iconURL());

        msg.edit(embed);
      });
  }
};

module.exports = Skin;
