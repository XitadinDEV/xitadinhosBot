const Command = require("../../src/structures/command")
module.exports = class SetCoins extends Command {
    constructor (client) {
        super(client, {
            name: "setmoney",
            aliases: ["setcoins"],
            category: "staff",
            description: "Altera a quantidade de xitadinhos coins do usuário.",
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    async run(message, args) {

        let member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.reply("você não mencionou o usuário desejado.")
        let user = await this.client.database.Users.findById(member.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.id
            }).save()
        }
        let value = args[1]
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.reply("o valor informado é inválido.")
        user.XitadinhosCoins = Number(value)
        user.save()

        message.reply(`a quantidade de xitadinhos coins de **${member.username}** foi alterada para \`${Number(value).toLocaleString()}\` com sucesso.`)
    }
}