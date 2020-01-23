const { MessageEmbed } = require("discord.js")
module.exports = class MessageEvent {
    constructor (client) {
        this.client = client
    }

    async run(message) {
        if (message.channel.type === "dm") return
        if (message.author.bot) return

        if (message.content === message.guild.me.toString()) return message.reply(`meu prefix é \`${process.env.PREFIX}\`, se quiser saber dos meus comandos, use \`${process.env.PREFIX}ajuda\`.`)
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user) {
            user = new this.client.database.Users({
                _id: message.author.id
            })
            user.save()
        }

        let aas = Math.round(Math.random() * 180)
        let aad = Math.round(Math.random() * 180)

        if (aas === aad) {
            let value = Math.round(Math.random() * 5000)

            let embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setColor(this.client.colors.default)
            .addField("Parece que surgiu dinheiro do céu", `Seja o primeiro a pegar o prêmio de \`${Number(value).toLocaleString()}\` xitadinhos coins, pegue o prêmio usando \`${process.env.PREFIX}pegar\`.`)

            message.guild.channels.get("666702864168648749").send(embed).then(msg => {
                const filter = m => m.content.startsWith(`${process.env.PREFIX}pegar`)
                const collector = msg.channel.createMessageCollector(filter, {
                    max: 1,
                    time: 300000
                })

                collector.on("collect", m => {
                    if (user._id === m.author.id) {
                        user.XitadinhosCoins += Number(value)
                        user.save()
                        m.reply(`parabéns, você ganhou \`${Number(value).toLocaleString()}\`Xitadinhos Coins.`)
                    }
                })
            })
        }

        if (!message.content.startsWith(process.env.PREFIX)) return
        let args = message.content.slice(process.env.PREFIX.length).trim().split(" ")
        let command = args.shift().toLowerCase()
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
        if (!cmd) return

        if (message.channel.id !== "667891081362276362") {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("os comandos estão bloqueados neste canal, você só pode executar os comandos no <#667891081362276362>.")
        }
        let userPermission = cmd.config.userPermission
        if (userPermission !== null) {
            if (!message.member.hasPermission(userPermission)) { 
                let perm = userPermission.map(value => value).join(", ")
                return message.reply(`você não pode executar este comando, pois não tem permissão para \`${perm}\``)
            }
        }

        if (cmd.config.OnlyDevs) {
            if (!["395788326835322882"].some(owner => message.author.id === owner)) return
        }

        try {
            new Promise((res, rej) => {
                message.channel.startTyping()
                res(cmd.run(message, args))
            }).then(() => message.channel.stopTyping()).catch(err => {
                console.error(err.stack)
                message.channel.stopTyping()
                let embed = new MessageEmbed()
                .setColor(this.client.colors.error)
                .setTitle("Eita penga, deu erro filho")
                .setDescription(`\`\`\`js\n${err.stack.slice(0, 2045)}\`\`\``)

                message.channel.send(embed)
            })
        } catch (err) {

        }
    }
}