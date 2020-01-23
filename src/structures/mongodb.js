const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.error(err)
    console.log("Conectada ao banco de dados")
})
let User = new mongoose.Schema({
	_id:{ type: String },
	XitadinhosCoins:{ type: Number, default: 0 },
	timedaily: { type: String, default: '0000000000000' },
	clan:{ type: String, default:"Nenhum" },
	hasclan:{ type: Boolean, default: false },
	apartamenttime:{ type: String, default: '0000000000000' }
})
  let LoJa = new mongoose.Schema({
    _id:{ type: String },
    custo:{ type: String, default: "0" },
    desk:{ type: String, default: "Sem descrição" },
    giverole:{ type: Boolean, default: false },
    roleid:{ type: String },
    resposta:{ type: String, default: "Parabéns por comprar o {item}" }
})
let vip = new mongoose.Schema({
    _id: { type: String },
    desk: { type: String },
    dailycusto: { type: String },
    custo: { type: String },
    vipID: { type: String }
})
let me = new mongoose.Schema({
    _id: { type: String },
    blockedCommands: { type: Map, default: new Map() }
})
exports.me = new mongoose.model('Me', me)
let Vips = new mongoose.model('Vips', vip)
exports.Vips = Vips
let Loja = new mongoose.model("Loja", LoJa)
exports.Loja = Loja
let Users = new mongoose.model("Users", User)
exports.Users = Users 
  