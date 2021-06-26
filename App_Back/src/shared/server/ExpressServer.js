import express from 'express'
import ManagerFactory from '../persistance/ManagerFactory.js'

import RecipeService from '../../recipes/business/services/RecipeService.js'
import IngredientService from '../../ingredients/business/services/IngredientService.js'
import UserService from '../../users/business/services/UserService.js'

import RecipeRouter from '../../recipes/router/RecipeRouter.js'
import UserRouter from '../../users/router/UserRouter.js'
import IngredientRouter from '../../ingredients/router/IngredientRouter.js'
import TestRouter from '../../../test/TestRouter.js'

class ExpressServer {

    constructor(){
        this.recipeManager = ManagerFactory.getRecipeManager()
        this.ingredientManager = ManagerFactory.getIngredientManager()
        this.userManager = ManagerFactory.getUserManager()

        this.recipeService = new RecipeService(this.recipeManager)
        this.ingredientService = new IngredientService(this.ingredientManager)
        this.userService = new UserService(this.userManager)

        this.recipeRouter = new RecipeRouter().createRecipeRouter(this.recipeService)        
        this.ingredientRouter = new IngredientRouter().createIngredientRouter(this.ingredientService)
        this.userRouter = new UserRouter().createUserRouter(this.userService)
        this.testRouter = new TestRouter().createTestRouter()
    }

    crearServidor(port){
        const app = express()
        app.use(express.json())
        app.use('/recipes', this.recipeRouter)
        app.use('/users', this.userRouter)
        app.use('/ingredients', this.ingredientRouter)
        app.use('/test', this.testRouter)

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
