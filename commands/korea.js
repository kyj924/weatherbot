const Discord = require('discord.js');

const { NovelCovid } = require('novelcovid');

const track = new NovelCovid()

module.exports = {
    name: "코로나 한국",
    description: "한국 코로나 현황",

    async run (client, message, args) {

        const nothing = new Discord.MessageEmbed()
        .setTitle('No args :(')

        const corona = await track.countries(args.join(" republic of korea "));

        if(!args[0]) return message.channel.send(nothing);


        const embed = new Discord.MessageEmbed()
        .setTitle(`${corona.country}`)
        .setDescription(`${corona.country} 의 코로나 현황`)
        .addField('확진자', corona.cases, true)
        .addField('사망자', corona.deaths, true)
        .addField('격리 해제', corona.recovered, true)
        .addField('오늘 격리중', corona.todayCases, true)
        .addField('오늘 사망자', corona.todayDeaths, true)
        .addField('현재 환자수', corona.active, true)
        .addField('중상자', corona.critical, true)
        .setFooter(`COVID-19 나라별 상황판 ${client.user.username}`, client.user.displayAvatarURL())

        message.channel.send(embed);

    }
}