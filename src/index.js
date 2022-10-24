require('dotenv').config()
const http = require('http')
const handler = require('./handlerRoutes')

const server = http.createServer(handler)

server.listen(process.env.SERVER_PORT || 3000,
    () => console.log(`servidor está rodando na porta ${process.env.SERVER_PORT || 3000}`))


process.on('uncaughtException', (err) => {
    console.log(`erro no servidor ${err}`)
})

