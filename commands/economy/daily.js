const Command = require("../../src/structures/command")
const moment = require("moment")
require("moment-duration-format")
module.exports = class Daily extends Command {
    constructor (client) {
        super(client, {
            name: "daily",
            aliases: ["diarios"],
            category: "economy",
            description: "Pegue os seus xitadinhos coins diários"
        })
    }

    async run(message, args) {
        let user = await this.client.database.Users.findById(message.author.id)
        let vips = await this.client.database.Vips.find({})
        let value = Math.round(Math.random() * 3000)
        let time = moment.duration.format([moment.duration(parseInt(user.timedaily) + 86400000 - Date.now())], "hh:mm:ss")

        if (parseInt(user.timedaily) + 86400000 < Date.now() || message.member.roles.get("632366506965205032")) {
            let ganha = 0
            let bonus = ""
            let vip = vips.filter(user => message.member.roles.get(user.vipID))
            if (typeof vip === "object") vip = vip[0]
            if (vip) {
                ganha = Number(vip.dailycusto)
                let role = message.guild.roles.get(vip.vipID)

                bonus = (parseInt(ganha) > 100 ? `Porém, como você é **\`${role.name}\`**, você ganhou um bonus.` : "")
            }

            user.XitadinhosCoins += Number(ganha + value)
            user.timedaily = Date.now()
            user.save()

            message.reply(`você coletou \`${Number(ganha + value).toLocaleString()}\` xitadinhos coins diários. ${bonus}`)
        } else {
            message.reply(`você já pegou os seus xitadinhos coins diários, espere mais \`${time}\` para pegar novamente`)
        }
    }
}