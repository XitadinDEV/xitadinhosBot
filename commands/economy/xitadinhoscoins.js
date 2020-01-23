const Command = require("../../src/structures/command")
module.exports = class XitadinhosCoins extends Command {
    constructor (client) {
        super(client, {
            name: "xitadinhoscoins",
            aliases: ["xcoins", "coins"],
            category: "economy",
            description: "Veja quantos xitadinhos coins que você ou algum usuário tenha."
        })
    }

    async run(message, args) {
        let member = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
        let user = await this.client.database.Users.findById(member.id)
        if (!user || user === null) {
            let novoUser = new this.client.database.Users({
                _id: member.id
            })
            novoUser.save()
        }

        if (message.author.id === member.id) {
            message.reply(`você possui \`${user.XitadinhosCoins.toLocaleString()}\` Xitadinhos Coins`)
        } else {
            message.reply(`o usuário **${member.username}** possui \`${user.XitadinhosCoins.toLocaleString()}\` Xitadinhos Coins`)
        }
    }
}