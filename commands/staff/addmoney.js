const Command = require("../../src/structures/command")
module.exports = class Pagamento extends Command {
    constructor (client) {
        super(client, {
            name: "addmoney",
            aliases: ["addduscoins"],
            category: "staff",
            description: "Adiciona xitadinhos coins para o usuário desejado.",
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
        user.XitadinhosCoins += Number(value)
        user.save()

        message.reply(`foi adicionado \`${Number(value).toLocaleString()}\` xitadinhos coins na conta do **${member.username}**.`)
    }
}