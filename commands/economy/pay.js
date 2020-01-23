const Command = require("../../src/structures/command")
module.exports = class XitadinhosPago extends Command {
    constructor (client) {
        super(client, {
            name: "pay",
            aliases: ["pagar"],
            category: "economy",
            description: "Pague alguem via Xitadinhos Pago."
        })
    }

    async run(message, args) {
        let member = this.client.users.get(args[0].replace(/[<@!>]/g, ""))
        if (!member) return message.reply("você não mencionou o usuário desejado.")
        let donator = await this.client.database.Users.findById(message.author.id)
        let receptor = await this.client.database.Users.findById(member.id)
        if (member.id === message.author.id) return message.reply("você não pode pagar para você mesmo.")
        let value = args[1]
        if (!value) return message.reply("você precisa informar o valor que deseja transferir.")
        let invalidValue = Number(value) < 0 || Number(value) === Infinity || isNaN(value)
        if (invalidValue) return message.reply("o valor informado é inválido.")
        if (donator.XitadinhosCoins < value) return message.reply("você não tem Xitadinhos Coins o suficiente.")
        receptor.XitadinhosCoins += Number(value)
        donator.XitadinhosCoins -= Number(value)
        receptor.save()
        donator.save()

        message.reply(`você transferiu \`${Number(value).toLocaleString()}\` Xitadinhos Coins para **${member.username}** com sucesso.`)
    }
}