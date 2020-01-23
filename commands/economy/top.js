const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class MoneyTop extends Command {
    constructor (client) {
        super(client, {
            name: "moneytop",
            aliases: ["topmoney","xitadinhostop"],
            category: "economy",
            description: "Mostra os top 15 mais ricos do servidor."
        })
    }

    async run(message, args) {
        let user = await this.client.database.Users.find({})
        let number = 1
        let users = []
        user.filter(user => message.guild.members.get(user._id)).forEach(user => {
            let us = message.guild.members.get(user._id)
            users.push({
                _id: `${us.user.username}#${us.user.discriminator}`,
                dudscoins: user.DudsCoin
            })
        })
        users.sort(function (a, b) {
            return b.dudscoins - a.dudscoins
        })

        let total = users.map(user => `**${number++}:** ${user._id} - *Xitadinhos Coins*: ${Number(user.dudscoins).toLocaleString()}*`).slice(0, 15)
        let embed = new MessageEmbed()
        .setColor(this.client.colors.default)
        .setTitle(`Top ${total.length} pessoas mais ricas`)
        .setDescription(total)

        message.channel.send(embed)
    }
}