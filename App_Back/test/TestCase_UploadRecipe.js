import AxiosClient from '../src/shared/client/AxiosClient.js'
import ExpressServer from '../src/shared/server/ExpressServer.js'
import MockForm from './mock/MockForm.js'


async function main(){
    let server = await new ExpressServer().crearServidor(8000)
    let client = await new AxiosClient(`http://localhost:${server.port}/api`)
    let formData = await new MockForm("../../../../../Descargas/milanesas_marineras_75173_600.jpg").getForm()    

    const msg = await client.uploadRecipe(formData)

    console.log(msg.data.msg)

    const {data} = await client.getRecipes()

    console.log(data)

    server.close()
}

main()