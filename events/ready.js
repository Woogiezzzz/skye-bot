const Discord = require("discord.js")

module.exports = bot => { 
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Minecraft", { type: "PLAYING"})
}

//type can be: WATCHING, PLAYING, LISTENING, STREAMING
