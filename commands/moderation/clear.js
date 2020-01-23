const Command = require("../../src/structures/command")
module.exports = class Clear extends Command {
    constructor (client) {
        super(client, {
            name: "clear",
            aliases: ["clean", "limpar"],
            category: "mod",
            description: "Limpa o chat desejado pelo usuário.",
            UserPermission: ["MANAGE_MESSAGES"]
        })
    }

    run(message, args) {

        if (!args[0]) return message.reply("você precisa informar a quantidade de mensagens.")
        if (args[0] > Number(100)) return message.reply("eu só posso limpar até `100` mensagens.")
        if (args[0] < Number(2)) return message.reply("não tem sentido eu limpar somente a sua mensagem, por isso você só pode escolher de `2` pra cima.")

        message.channel.bulkDelete(args[0]).then(msg => {
            message.reply(`foram deletadas \`${msg.size}\` mensagens.`)
        }).catch(() => {
            message.reply("eu não consegui deletar algumas mensagens, pois elas têm mais de `14` dias.")
        })
    }
}