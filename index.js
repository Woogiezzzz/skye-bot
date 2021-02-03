const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const keepAlive = require('./server');
const db = require('quick.db');
const ms = require('ms');


const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't Find Commands!");
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		bot.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {
			bot.aliases.set(alias, pull.config.name);
		});
	});
});


const { badwords } = require('./banwords.json')

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

     if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed welcome back!!!`)
    }

    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(`${message.mentions.members.first().user.tag} is currently AFK please do not disturb them\n**Reason:** ${db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)}`)
        }else;
    }else;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    let confirm = false;
   
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;


      
    }
    
    if(confirm) {
       const user = message.member
       const logEmbed = new Discord.MessageEmbed()
       .setTitle(`${message.author.username}`)
       .setDescription(`Message: ${message.content}`)
       if(message.channel.id === '759239648391200808') return;
       if(message.channel.id === '759239632519954502') return;
       if(message.channel.id === '765909159844511765') return;
       if(message.channel.id === '759666519663443968') return;
       if (message.member.hasPermission("MANAGE_MESSAGES")) return;
       if (message.member.hasPermission("ADMINISTRATOR")) return;
       
      let curseid =[
        "=av@zK'mhzVOUA0CIEGDny",
        "8ad7tadmah8Gs--dgaysE8",
        "%H_hlwiG$47BW@v-gjT1-a",
        "XYir1Frj9geBYRgH9VD0sU",
        "3F00MnIYt4D8dJ2D2peMbw"
      ] 
      let index = (Math.floor(Math.random() * Math.floor(curseid.length)));
      const dmwarnembed = new Discord.MessageEmbed()
      .setColor("#FFFF00")
      .setTitle(`You have been warned in ${message.guild}`)
      .setDescription(`You were warned by the auto moderation system\n\n**REASON:**\nSending Links/Discord Links in channel(s)\n\n**Don't report this warn to a staff.**\nWhen you report this warn you will not get replied back since staff does not accept warn reports form the auto mod.\n\n**Punishment ID:**\n\`${curseid[index]}\``)
      .setTimestamp()
      message.author.send(dmwarnembed)

      message.delete()
      message.channel.send(`${message.author} Do not send links into the server`)
      db.add(`warnings_${message.author}`, 1)

      const warnings = db.fetch(`warnings_${message.author}`)

      if (warnings > 2) {
      let role = message.guild.roles.cache.get('mute_role_id');
      

      let t = message.guild.roles.cache.get('member_role_id');

      const chatEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`**${user} has been muted for breaking too many rules.**`)

      const muteembed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("You have been muted in the Ahiru Server")
      .setDescription("You were muted by the auto moderation system\n\n**REASON:**\nSending links in the server\n\n**Expires:**\n6h")
      .setTimestamp()
      message.author.send(muteembed)
      
      const unmute = new Discord.MessageEmbed()
      .setDescription("You have been unmuted in the Ahiru server")
      .setColor("GREEN")
     
    message.channel.send(chatEmbed)
     user.roles.add(role)
     user.roles.remove(t)
     setTimeout(() => {
     user.roles.remove(role)
     user.roles.add(t)
     user.send(unmute)
     db.delete(`warnings_${message.author}`)
      }, 7200000)
    
      
      }
      
    }   
    
    if (message.content === '_bruh'){
      message.channel.send('BRUH MOMENTO')
    } else if (message.content === '_oof'){
      message.channel.send('OOF!!!')
    } else if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
    return message.channel.send(`My preifx is \`>\``)
    } 
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

keepAlive();

bot.login(process.env.TOKEN)//token is in the .env file
