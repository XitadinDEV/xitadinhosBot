const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
require("dotenv").config()
module.exports = class XitadinhosBot extends Client {
    constructor (options = {}) {
        super(options)

        this.commands = new Collection()
        this.aliases = new Collection()
        this.colors = require("./colors")
        this.database = require("./structures/database")
    }

    login (token) {
        super.login(token)
        return this
    }

    loadCommands (path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err)
            f.forEach(category => {
                readdir(`./${path}/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        const Command = require(`.${path}/${category}/${cmd}`)
                        const command = new Command(this)
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(alias => this.aliases.set(alias, command.config.name))
                    })
                })
            })
        })
    }

    loadEvents (path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err)
            f.forEach(events => {
                const Event = require(`../${path}/${events}`)
                const event = new Event(this)
                super.on(events.split(".")[0], (...args) => event.run(...args))
            })
        })

        return this
    }
}