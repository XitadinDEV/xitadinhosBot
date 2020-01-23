const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Kick extends Command {
    constructor (client) {
        super(client, {
            name: "kick",
            aliases: ["expulsar"],
            category: "mod",
            description: "Expulsa um membro do servidor.",
            UserPermission: ["KICK_MEMBERS"]
        })
    }

    async run(message, args) {
        if (!args[0]) return message.reply("você não informou o usuário desejado")
        let member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
        let inGuild = message.guild.members.get(member.id)
        if (!inGuild) return message.reply("este usuário não está no servidor.")
        
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "Nenhum motivo"
        }

        inGuild.kick(reason).then(() => {
            message.reply("usuário expulso com sucesso.")
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(`Expulso | ${member.tag}`, member.displayAvatarURL())
            .setThumbnail(member.displayAvatarURL())
            .addField("Usuário expulso", `\`${member.tag}\``, true)
            .addField("ID do usuário", `\`${member.id}\``, true)
            .addField("Quem puniu", `\`${message.author.tag}\``, true)
            .addField("ID do(a) staff", `\`${message.author.id}\``, true)
            .addField("Motivo", reason, true)

            message.guild.channels.get("642210113339260928").send(embed)
        })
    }
}