import AxiosClient from '../test/testClient/AxiosClient.js'
import ExpressServer from '../src/shared/server/ExpressServer.js'
import MockForm from './mock/MockForm.js'

async function main(){
    const server = await new ExpressServer().crearServidor(8000)
    const client = await new AxiosClient(`http://localhost:${server.port}`)
    const dir = process.cwd()
    const formData = await new MockForm(dir + "/uploads/milanesas_marineras_75173_600.jpg").getForm()    

    const msg = await client.uploadRecipe(formData)

    console.log(msg.data.msg)

    const {data} = await client.getRecipes()

    console.log(data[1])

    server.close()
}

main()