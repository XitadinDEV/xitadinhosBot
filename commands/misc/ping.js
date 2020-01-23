const Command = require("../../src/structures/command")
module.exports = class Ping extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            aliases: ["pang", "peng", "pong", "pung"],
            category: "misc",
            description: "Mostra a minha latência."
        })
    }

    run(message, args) {
        message.reply(`pong! \`${Math.round(this.client.ws.ping)}\`ms!`)
    }
}