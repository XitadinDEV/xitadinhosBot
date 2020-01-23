const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Enquetes extends Command {
    constructor (client) {
        super(client, {
            name: "enquete",
            aliases: [],
            category: "staff",
            description: "Envia uma enquete no canal de texto desejado.",
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    run(message, args) {
        let channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
        if (!channel) return message.reply("você precisa mencionar o chat desejado.")
        let msg = args.slice(1).join(" ")
        if (!msg) return message.reply("você precisa informar o que irá ter no embed")
        let embed = new MessageEmbed()
        .setColor(this.client.colors.default)
        .setTitle("Enquete")
        .setDescription(msg)
        .setFooter(`Enviado por ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp(new Date())

        message.channel.send(embed).then(msg => {
            setTimeout(() => msg.react("637899418322075648"), 500)
            setTimeout(() => msg.react("637901199777071144"), 1000)
        })
    }
}