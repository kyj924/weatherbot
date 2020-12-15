const Discord = require('discord.js');

module.exports = {
    name: "킥",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('사용 권한이 없습니다!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('봇이 권한을 가지고 있지 않습니다')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('유저를 지정해주세요');

        if(!member) return message.channel.send('해당 유저를 찾을 수 없스1ㅂ니다');
        if(!member.kickable) return message.channel.send('이 유저는 킥할 수 없습니다');

        if(member.id === message.author.id) return message.channel.send('스스로 킥 할 수 없습니다');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })

        const kickembed = new Discord.MessageEmbed()
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);


    }
}