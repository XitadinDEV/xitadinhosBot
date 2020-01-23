const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class SkinMC extends Command {
    constructor(client) {
        super(client, {
            name: "mcbody",
            aliases: [],
            category: "minecraft",
            description: "Veja a skin completa der um player do minecraft."
        })
    }

    run(message, args) {
        const img = `https://mc-heads.net/body/${args[0]}/256.png`
        if (!img) return message.reply("você não informou o nickname do jogador.")

        let embed = new MessageEmbed()
        .setDescription(`Baixe clicando [aqui](${img})`)
        .setColor(this.client.colors.default)
        .setImage(img)

        message.channel.send(embed)
    }
}