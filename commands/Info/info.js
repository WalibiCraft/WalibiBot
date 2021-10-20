const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Discord = require("discord.js");

module.exports = {
  name: "info",
  aliases: ["information"],
  category: "info",
  description:
    "Affiche des informations supplémentaires sur la commande spécifiée",
  usage: "w/info <Commande>",
  statut: "on",
  run: async (client, message, args) => {
    if (!args[0]) {
      const ErrorEmbed = new RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(
          "Vous devez spécifier un nom de commande :x:\nListe des commandes obtensible avec la commande `w/help` :bulb:"
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL);

      message.channel.send(ErrorEmbed);
    }
    getCMD(client, message, args[0]);
  }
};

function getCMD(client, message, input) {
  const embed = new RichEmbed().setAuthor(
    message.author.tag,
    message.author.displayAvatarURL
  );

  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let things = message.content.trim().split(/ +/g);
  let arg = things.slice(1).join(" ");

  let info =
    "Je n'ai trouvé aucune information pour la commande `" +
    arg +
    "`:x:\nListe des commandes obtenable avec la commande `w/help` :bulb:";

  if (!cmd) {
    return message.channel.send(
      embed
        .setColor("RED")
        .setDescription(info)
        .setTimestamp()
        .setFooter("WalibiBot", message.guild.iconURL)
    );
  }

  if (cmd.name) info = "**Nom de la Commande :** `" + cmd.name + "`";
  if (cmd.aliases)
    info += `\n**Aliases :** ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
  if (cmd.description) info += `\n**Description :** ${cmd.description}`;
  if (cmd.usage) {
    info += "\n**Usage :** `" + cmd.usage + "`";
    embed.addField(
      "Syntaxe :",
      "`<>` = Argument obligatoire / `[]` = Argument facultatif"
    );
  }

  return message.channel.send(
    embed
      .setColor("17ace8")
      .setDescription(info)
      .setTimestamp()
      .setTitle(":bulb: INFO")
      .setFooter("WalibiBot", message.guild.iconURL)
  );
}