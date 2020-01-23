const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class SkinMCSearch extends Command {
    constructor(client) {
        super(client, {
            name: "mcskin",
            aliases: ["procurarskin"],
            category: "minecraft",
            description: "Baixe a skin de algum jogador de minecraft."
        })
    }

    run(message, args) {
        const img = `https://mc-heads.net/skin/${args[0]}/256.png`
        if (!img) return message.reply("você não informou o nickname do jogador.")

        message.channel.send(`**${message.author.username}**`, {
            files: [{
                attachment: img,
                name: `${args[0]}.png`
            }]
        })
    }
}