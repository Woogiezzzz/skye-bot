const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
  const content = message.content.split(" ").slice(1).join(" ")
  if (content === null) content = "UNSPECIFIED"
  await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
  const embed = new Discord.MessageEmbed()
    .setDescription(`**You have been set to AFK OwO**\n**Reason:** \`${content}\``)
    .setColor("#FFB6C1")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
  message.channel.send(embed)  
}

module.exports.config = {
  name: 'afk',
  aliases: []
}
