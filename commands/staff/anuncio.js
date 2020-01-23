const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class anunciar extends Command {
    constructor (client) {
        super(client, {
            name: "anuncio",
            aliases: [],
            category: "staff",
            description: "Envia um anúncio no canal de texto desejado.",
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
        .setDescription(msg)
        .setFooter(`Enviado por ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp(new Date())

        message.channel.send(`**${message.author.username}**, você deseja mencionar todo mundo?`).then(msg => {
            setTimeout(() => msg.react("637899418322075648"), 500)
            setTimeout(() => msg.react("637901199777071144"), 1000)

            const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "error", "success") && (user.id !== this.client.user.id && user.id === message.author.id))
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case "success":
                    channel.send("@everyone", embed, {disableEveryone: false})
                    msg.delete()
                    message.reply("certo, embed enviado com sucesso.")
                    break;
                    case "error":
                    channel.send(embed)
                    msg.delete()
                    message.reply("certo, embed enviado com sucesso.")
                }
            })
        })
    }
}