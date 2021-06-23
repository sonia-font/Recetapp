import express from 'express'
import RecipeRouter from '../../recipes/router/RecipeRouter.js'

class ExpressServer {

    constructor(){
        this.recipeRouter = new RecipeRouter().createRecipeRouter()
    }

    crearServidor(port){
        const app = express()
        app.use(express.json())
        app.use('/api', this.recipeRouter)

        return new Promise((resolve, reject) => {
            const server = app.listen(port)
                .once('error', (err) => {
                    reject(new Error('error al conectarse al servidor'))
                })
                .once('listening', () => {
                    console.log('Listening on port ' + server.address().port)
                    server.port = server.address().port
                    resolve(server)
                })
        })
    }
}

export default ExpressServer
