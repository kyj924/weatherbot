const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { Timers } = require("../../variable");
module.exports = {
  name: "타이머",
  description: "Set a timer for your self!",
  usage: "<#d/h/m>",
  category: "utility",
  run: async (bot, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        `타이머를 설정할 시간을 지정하지 않았습니다!`
      );
    }
    if (!args[0].endsWith("d")) {
      if (!args[0].endsWith("h")) {
        if (!args[0].endsWith("m")) {
          return message.channel.send(
            `당분간 적절한 형식을 사용하지 않았습니다`
          );
        }
      }
    }
    if (isNaN(args[0][0])) {
      return message.channel.send(`숫자가 아닙니다`);
    }
    Timers.set(message.author.id + " G " + message.guild.name, {
      Guild: message.guild.name,
      Author: {
        Tag: message.author.tag,
        ID: message.author.id,
      },
      Time: ms(args[0]),
    });
    message.channel.send(
      `${message.author.tag} 타이머를 설정했습니다 ${args[0]} (${ms(
        args[0]
      )}MS)`
    );
    setTimeout(() => {
      let Embed = new MessageEmbed()
        .setTitle(`타이머가 종료되었습니다 ${message.guild.name}..`)
        .setDescription(
          `Your timer for ${args[0]} (${ms(args[0])}MS) has finished!`
        )
        .setColor(`GREEN`);
      message.author.send(Embed);
      Timers.delete(message.author.id + " G " + message.guild.name);
    }, ms(args[0]));
  },
};
