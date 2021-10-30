const fetch = require("node-fetch");
const Discord = require("discord.js")
const Command = require('../../structures/Command');
class Skin extends Command {

  constructor(...args) {
    super({
      description: "Génére un aperçu du skin Minecraft du pseudo précisé",
      usage: ["w/skin <Pseudo Minecraft>", "w/skin <UUID>"],
      examples: ["w/skin GrandMega","w/skin 13e80768-3a46-435f-a91a-aa9cd0bd12ed", "w/skin 13e807683a46435fa91aaa9cd0bd12ed"],
      cooldown: 1000,
      aliases: ["mc", "mcskin", "render"],
      guildOnly: true,
      enabled: true,
      args: [
        {
          key: 'pseudo',
          required: true
        }
      ]
    }, ...args);
  }
  async execute(message, args) {
    const InvalidPseudoEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Le pseudo `" +
        args.pseudo +
        "` n'est pas valide :x: \nPlus d'informations avec la commande `w/help <Commande>` :bulb:"
      )
      .setTimestamp()
      .setFooter("WalibiBot", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

    const content = message.content.trim().split(/ +/g);
    const user = content.slice(1).join(" ");

    //const msg = await message.reply(`**<a:Typing:635137206796681253> Chargement en cours...**`);

    fetch(`https://some-random-api.ml/mc?username=${user}`)
      .then(res => res.json())
      .then(body => {
        if (!body || !body.uuid)
          return message.reply({embeds: [InvalidPseudoEmbed]});

        const uuid = body.uuid;
        let beauté = "beau"
        if(uuid == "822fea6fdf1342ce960b61485ea0df39"){
          beauté = "moche"
        }
        const image = `https://crafatar.com/renders/body/${uuid}?&default=MHF_Steve`
        const embed = new Discord.MessageEmbed()
          .setColor("17ace8")
          .setTitle(":bust_in_silhouette: AVATAR")
          .setDescription(
            `Voici le skin de \`${args.pseudo}\`, il est bien ${beauté} dit donc :smirk: \n[Télécharger le skin](https://visage.surgeplay.com/skin/${uuid}.png)`
          )
          .setTimestamp()
          .setImage(image)
          .setFooter("WalibiBot", message.guild.iconURL());
        message.reply({embeds: [embed]});
      });
  }
};

module.exports = Skin;
