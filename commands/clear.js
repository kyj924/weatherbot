module.exports = {
    name: "지우기",
    description: "청소기능",

    async run (client, message, args) {

        const amount = args.join(" ");

        if(!amount) return message.reply('삭제할 메세지 양을 입력해주세요')

        if(amount > 100) return message.reply(`100자 이상의 글자를 삭제할 수 없습니다`)

        if(amount < 1) return message.reply(`최소 1개의 메세지를 삭제해야합니다`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send('Success!')

    }
}