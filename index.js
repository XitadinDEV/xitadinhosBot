const Client = require("./src/Client")
const client = new Client({fetchAllMembers: true})
require("./src/structures/ProtoTypes").start()
require("dotenv").config()
client.loadCommands("./commands")
client.loadEvents("./events")
client.login(process.env.TOKEN)