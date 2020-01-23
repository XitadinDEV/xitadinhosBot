const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Unban extends Command {
    constructor (client) {
        super(client, {
            name: "unban",
            aliases: ["desbanir", "pardon"],
            category: "mod",
            description: "Desbane o usuário do servidor.",
            UserPermission: ["BAN_MEMBERS"]
        })
    }

    async run(message, args) {
        if (!args[0]) return message.reply("você não informou o usuário desejado.")
        let member = await message.guild.fetchBans()
        let ban
        ban = member.get(`${args[0]}`.replace(/[<@!>]/g, ""))
        if (!ban) return message.reply("este usuário não está banido.")
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }
        message.guild.members.unban(ban.user.id).then(user => {
            message.reply("usuário desbanido com sucesso.")

            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Desbanido | ${user.tag}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addField("Usuário desbanido", `\`${user.tag}\``, true)
            .addField("ID do usuário", `\`${user.id}\``, true)
            .addField("Desbanido por", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            message.guild.channels.get("642210113339260928").send(embed)
        })
    }
}