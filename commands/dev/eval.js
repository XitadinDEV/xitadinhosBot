const Command = require('../../src/structures/command')
const { MessageEmbed } = require("discord.js")
module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["evaluate", "e"],
            category: "dev",
            OnlyDevs: true
        })
    }

    async run(message, args) {
        try {
            let util = require("util");
            let code = args.join(' ');
            let ev = eval(code)
            let str = util.inspect(ev, {
                depth: 1
            })
            str = `${str.replace(new RegExp(`${this.client.token}`, "g"), "undefined")}`;
            if (str.length > 1800) {
                str = str.substr(0, 1800)
                str = str + "..."
            }
            message.channel.send(str, { code: 'js' })

        } catch (err) {
            if (err.stack.length > 1800) {
              err.stack = err.stack.substr(0, 1800)
              err.stack = `${err.stack}...`
            }
            const embed = new MessageEmbed()
            .setColor(this.client.colors.error)
            .setTitle("Eita penga, deu erro filho")
            .setDescription(`\`\`\`${err.stack}\`\`\``)

            message.channel.send(embed)
        }
    }
}