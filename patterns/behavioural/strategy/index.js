/* designer pattern strategy - várias formas de fazer uma mesma coisa e separar cada uma dessas 
//formas em classes que são chamadas estrátegias. 
// Respeita o Open/Close  Princ, onde é possível adicionar novas regras sem alterar o contexto
// Substitiu a herança em programas funcionais. */


import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postegresStrategy.js"

const postgresConnectionString = "postgres://camisbrussi:senha0001@localhost:5433/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://camisbrussi:senhaadmin@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()



const data = [{
    name: 'camilaSbrussi',
    type: 'transaction'
}, {
    name: 'mariasilva',
    type: 'activityLog'
}]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for(const {type, name} of data) {
    const context = contextTypes[type]
    await context.create({ name: name + Date.now()})
    
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}