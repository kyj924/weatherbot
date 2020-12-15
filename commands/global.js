const Discord = require('discord.js');

const { NovelCovid } = require('novelcovid');

const track = new NovelCovid()

module.exports = {
    name: "코로나 세계",
    description: "COVID-19 전세계 현황",

    async run (client, message, args) {

    
        const corona = await track.all();


        const embed = new Discord.MessageEmbed()
        .setTitle(`전세계`)
        .setDescription(`COVID-19 정보`)
        .addField('확진자', corona.cases, true)
        .addField('사망자', corona.deaths, true)
        .addField('격리 해제', corona.recovered, true)
        .addField('오늘 격리중', corona.todayCases, true)
        .addField('오늘 사망자', corona.todayDeaths, true)
        .addField('현재 환자수', corona.active, true)
        .addField('중상자', corona.critical, true)
        .setFooter('COVID-19 세계 상황판', client.user.displayAvatarURL())

        message.channel.send(embed);

    }
}