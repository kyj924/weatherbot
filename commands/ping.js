const Discord = require('discord.js')

module.exports = {
    name: "핑",
    description: "반응속도",

    async run (client, message, args) {


        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\`ms`);


        message.channel.send(ping);
    }
}