const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class UnMute extends Command {
    constructor (client) {
        super(client, {
            name: "unmute",
            aliases: ["desmutar"],
            category: "mod",
            description: "Retira o silenciamento do usuário desejado.",
            UserPermission: ["MUTE_MEMBERS", "KICK_MEMBERS"]
        })
    }

    async run(message, args) {
        
        if (!args[0]) return message.reply("você não informou o usuário desejado.")
        const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!member) return message.reply("este usuário não está no servidor.")
        const role = message.guild.roles.find(r => r.name === "Silenciado")
        if (!member.roles.has(role.id)) return message.reply("este usuário não está silenciado.")
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }

        member.roles.remove(role.id).then(() => {
            message.reply("silenciamento retirado com sucesso.")
            
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Silenciamento retirado | ${member.user.tag}`, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Usuário desbanido", `\`${member.user.tag}\``, true)
            .addField("ID do usuário", `\`${member.user.id}\``, true)
            .addField("Desbanido por", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            message.guild.channels.get("642210113339260928").send(embed)
        })
    }
}