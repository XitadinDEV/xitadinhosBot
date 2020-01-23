const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class Lojinha extends Command {
    constructor (client) {
        super(client, {
            name: "shop",
            aliases: ["loja", "store"],
            category: "economy",
            description: "Veja os ítens que estão na loja atualmente."
        })
    }

    async run(message, args) {
        let itens = await this.client.database.Loja.find({});
        let vips = await this.client.database.Vips.find({})
        
        vips = vips.sort((a,b) => b.custo - a.custo)
        
        let pagesVips = [
        vips.map(a => `**${a._id}** - <@&${a.vipID}>\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(0, 9)
            .join("\n\n"),
        vips.map(a => `**${a._id}** - <@&${a.vipID}>\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(10, 19)
            .join("\n\n") || null,
        vips.map(a => `**${a._id}** - <@&${a.vipID}>\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(20, 29)
            .join("\n\n") || null
        ]

        itens = itens.sort((a, b) => b.custo - a.custo);
        let pagesitens = [
        itens
            .map(a => `**${a._id}**\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(0, 9)
            .join("\n\n"),
        itens
            .map(a => `**${a._id}**\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(10, 19)
            .join("\n\n") || null,
        itens
            .map(a => `**${a._id}**\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(20, 29)
            .join("\n\n") || null,
        itens
            .map(a => `**${a._id}**\n*Preço*: ${Number(a.custo).toLocaleString()}\n${a.desk}`)
            .slice(30, 39)
            .join("\n\n") || null
        ];

        let categoria = args[0]
        let pagina = Number(args[1]) - 1 || 0
        let getEmbed = (categor, content, pag, array) => {
        pag = pag + 1
        return {
            embed: {
                color: Math.floor(Math.random() * 0xFFFFF + 1),
                title: `Loja - ${ categor.charAt(0).toUpperCase() + categor.slice(1, categor.length)}`,
                description: content,
                footer: {
                    text: `Pagina ${pag}/${array.filter(a => a !== null).length}`
                },
                thumbnail: {
                    url: message.guild.iconURL()
                }
            }
        }
    }
    switch(categoria) {

        case "vips":
            if (pagesVips[pagina] === null) pagina = 0
            message.channel.send(getEmbed(categoria, pagesVips[pagina], pagina, pagesVips))
            break;
        case "itens":
            if (pagesitens[pagina] === null) pagina = 0
            message.channel.send(getEmbed(categoria, pagesitens[pagina], pagina, pagesitens))
            
            break;
            default:
            message.reply("informe qual categoria você deseja ver `\nvips\nitens`")
        }
    }
}