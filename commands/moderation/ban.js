const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Ban extends Command {
    constructor (client) {
        super(client, {
            name: "ban",
            aliases: ["banir"],
            category: "mod",
            description: "Bane o usuário do servidor",
            UserPermission: ["BAN_MEMBERS"]
        })
    }

    async run(message, args) {

        if (!args[0]) return message.reply("você não informou o usuário desejado.")
        let member = await this.client.users.fetch(`${args[0]}`.replace(/[<@!>]/g, ""))
        let ban
        ban = message.guild.members.get(member.id)
        if (!ban) {
            ban = member
        }
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo."
        }

        message.guild.members.ban(ban.id, {
            days: 7,
            reason: `Punido por: ${message.author.tag} - Motivo: ${reason}`
        }).then(user => {
            message.reply("usuário banido com sucesso.")
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Banido | ${user.tag}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addField("Usuário banido", `\`${user.tag}\``, true)
            .addField("ID do usuário", `\`${user.id}\``, true)
            .addField("Quem puniu", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            message.guild.channels.get("642210113339260928").send(embed)
        })
    }
}