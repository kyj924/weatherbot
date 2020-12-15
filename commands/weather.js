const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "날씨",
    description: "기상정보 확인",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('지역을 입력해주세요')

        if(result === undefined || result.length === 0) return message.channel.send('**없는** 지역입니다');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(` ${current.observationpoint} 의 날씨입니다.`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('시간대', `UTC${location.timezone}`, true)
        .addField('온도 단위', '섭씨', true)
        .addField('온도', `${current.temperature}°`, true)
        .addField('바람', current.winddisplay, true)
        .addField('체감 온도', `${current.feelslike}°`, true)
        .addField('습기', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}