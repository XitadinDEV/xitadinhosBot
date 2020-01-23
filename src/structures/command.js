module.exports = class Command {
    constructor (client, options) {
        this.client = client

        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || "misc",
            description: options.description || null,
            UserPermission: options.UserPermission || null,
            OnlyDevs: options.OnlyDevs || false
        }
    }
}