module.exports = class ReadyEvent {
    constructor(client) {
        this.client = client
    }

    run() {
        console.log("Conectada ao Discord")
        
        this.client.user.setPresence({activity: {name: `${process.env.PREFIX}ajuda | ${Number(this.client.users.size).toLocaleString()} usuários`}})
    }
}