const Command = require("../../src/structures/command")
module.exports = class Ajuda extends Command {
    constructor (client) {
        super(client, {
            name: "ajuda",
            aliases:["ajuda", "comandos", "commands"],
            category: "misc",
            description: "Mostra essa lista atual."
        })
    }

    run(message, args) {

        let misc = this.client.commands.filter(c => c.config.category === "misc").map(c => `${process.env.PREFIX}${c.config.name} :: ${c.config.description}`).join("\n")
        let economy = this.client.commands.filter(c => c.config.category === "economy").map(c => `${process.env.PREFIX}${c.config.name} :: ${c.config.description}`).join("\n")
        let staff = this.client.commands.filter(c => c.config.category === "staff").map(c => `${process.env.PREFIX}${c.config.name} :: ${c.config.description}`).join("\n")
        let minecraft = this.client.commands.filter(c => c.config.category === "minecraft").map(c => `${process.env.PREFIX}${c.config.name} :: ${c.config.description}`).join("\n")
        let mod = this.client.commands.filter(c => c.config.category === "mod").map(c => `${process.env.PREFIX}${c.config.name} :: ${c.config.description}`).join("\n")
        let list = `= ECONOMIA =\n\n${economy}\n\n= MISCELANÊA =\n\n${misc}\n\n= COMANDOS DA STAFF =\n\n${staff}\n\n= COMANDOS MINECRAFT =\n\n${minecraft}\n\n= MODERAÇÃO =\n\n${mod}`

        message.author.send(`**Lista de comandos**\n\n\`\`\`asciidoc\n${list}\`\`\``).then(() => message.reply("enviei no seu privado.")).catch(err => {
            message.reply("o seu privado se encontra fechado, não consigo enviar lá.")
        })
    }
}