import AxiosClient from '../src/shared/client/AxiosClient.js'
import ExpressServer from '../src/shared/server/ExpressServer.js'

async function main(){
    let server = await new ExpressServer().crearServidor(8000)
    let client = await new AxiosClient(`http://localhost:${server.port}/api`)

    
    const { data } = await client.sendRecipe(0, 0, 'pdf')

    console.log(data)

    server.close()
}

main()

