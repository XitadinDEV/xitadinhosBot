const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class AvatarMINE extends Command {
    constructor(client) {
        super(client, {
            name: "mcavatar",
            aliases: [],
            category: "minecraft",
            description: "Veja o rosto da skin de algum jogador de minecraft."
        })
    }

    run(message, args) {
        const img = `https://mc-heads.net/avatar/${args[0]}/256.png`
        if (!img) return message.reply("você não informou o nickname do jogador.")

        let embed = new MessageEmbed()
        .setDescription(`Baixe clicando [aqui](${img})`)
        .setColor(this.client.colors.default)
        .setImage(img)

        message.channel.send(embed)
    }
}