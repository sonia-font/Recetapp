import ExpressServer from './shared/server/ExpressServer.js'

async function main(){
    let server = await new ExpressServer().crearServidor(8000)

    console.log(`Servidor listo en http://localhost:${server.port}`)
}

main()