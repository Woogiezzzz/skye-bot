const Discord = require('discord.js') 

module.exports.run = async(bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You dont have the Permission **`BAN MEMBERS`**")
  let member = message.mentions.members.first();
  let reason = message.content.split(" ").slice(2).join(" ")
  if (!member) return message.reply("Please mention a user to ban")
  if (!reason) reason = "Unspecified"
  if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');
  if (!member.bannable) return message.channel.send('I was not able to ban that member')
  const banembed = new Discord.MessageEmbed()
  .setDescription(`${member} has been banned from the server with the ID \`${member.id}\``)
  .setColor("#FF0000")
  message.channel.send(banembed)
  const dmbanembed = new Discord.MessageEmbed()
  .setTitle(`You have been Banned from ${message.guild}`)
  .setDescription(`**REASON FOR BAN:**\n${reason}`)
  .setTimestamp()
  member.send(dmbanembed)
  member.ban()
}

module.exports.config = {
  name:'ban',
  aliases:['b']
}
