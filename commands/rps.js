const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../function.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports.run = async(client, message, args) => {
  
            const embed = new MessageEmbed()
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp()
            .setColor("RANDOM")

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return 'OwO You Won'
            } else if (me === clientChosen) {
                return 'It was a Tie'
            } else {
                return 'Sorry You Lost :('
            }
      }
}


module.exports.config = {
  name:'rps',
  aliases:[]
}
