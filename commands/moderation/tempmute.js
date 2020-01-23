const Command = require("../../src/structures/command")
const parse = require("parse-duration")
const { MessageEmbed } = require("discord.js")
module.exports = class TempMute extends Command {
    constructor (client) {
        super(client, {
            name: "tempmute",
            aliases: [],
            category: "mod",
            description: "Silencia temporariamente o usuário.",
            UserPermission: ["KICK_MEMBERS", "MUTE_MEMBERS"]
        })
    }

    async run(message, args) {
        if (!args[0]) return message.reply("você não informou o usuário desejado.")
        let member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
        let guild = message.guild.members.get(member.id)
        if (!guild) return message.reply("este usuário não está no servidor.")
        let time = args[1]
        if (!time) return message.reply("você não colocou um tempo.")
        let reason = args.slice(2).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }
        let role = message.guild.roles.find(r => r.name === "Silenciado")
        if (!role) {
            role = await message.guild.roles.create({
                name: "Silenciado",
                color: "#000000",
                permissions: []
            })

            message.guild.channels.forEach(async channel => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false,
                    CONNECT: false
                })
            })
        }

        guild.roles.add(role.id).then(() => {
            message.reply("usuário silenciado com sucesso.")

            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Silenciado | ${member.tag}`, member.displayAvatarURL())
            .setThumbnail(member.displayAvatarURL())
            .addField("Usuário silenciado", `\`${member.tag}\``, true)
            .addField("ID do usuário", `\`${member.id}\``, true)
            .addField("Desbanido por", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            message.guild.channels.get("642210113339260928").send(embed)

            setTimeout(() => guild.roles.remove(role.id), parse(time))
        })
    }
}