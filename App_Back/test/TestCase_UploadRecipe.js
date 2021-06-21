import AxiosClient from '../src/shared/client/AxiosClient.js'
import ExpressServer from '../src/shared/server/ExpressServer.js'
import FormData from 'form-data'
import fs from 'fs'

async function main(){
    let server = await new ExpressServer().crearServidor(8000)
    let client = await new AxiosClient(`http://localhost:${server.port}/api`)

    let formData = new FormData();
    formData.append('title', 'Milanesas marineras')
    formData.append('image', fs.createReadStream("../../../../Descargas/milanesas_marineras_75173_600.jpg"))
    formData.append('plates', 3)
    formData.append('time', 30)
    formData.append('difficulty', 'Baja')
    formData.append('characteristics', 'Coste medio, Receta sin sal, Frito')
    formData.append('ingredients', JSON.stringify([
        {
            name: 'Huevo',
            amount: 1,
            unit: 'unidad'
        },
        {
            name: 'Carne',
            amount: 3,
            unit: 'filetes'
        },
        {
            name: 'Harina 000',
            amount: 0.25,
            unit: 'taza'
        },
        {
            name:'Provenzal',
            amount: 1,
            unit: 'pizca'
        }
    ]))

    const msg = await client.uploadRecipe(formData)

    console.log(msg.data.msg)

    const {data} = await client.getRecipes()

    console.log(data)

    server.close()
}

main()