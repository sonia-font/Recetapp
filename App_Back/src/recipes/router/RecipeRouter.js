import express from 'express'

class RecipeRouter {

    constructor(recipeService){
        this.recipeService = recipeService
        const recipeRouter = express.Router()

        //DEVUELVE TODAS LAS RECETAS PARA LA VISTA GENERAL
        recipeRouter.get('/all', async (req, res, next) => {
            try {
                const recipes = await this.recipeService.getAll()
                res.json(recipes)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE RECETAS SEGUN FILTRO
        recipeRouter.get('/', async (req, res, next) => {
            try {
                
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE UNA RECETA POR ID
        recipeRouter.get('/', async (req, res, next) => {
            try {
                
            } catch(error) {
                next(error)
            }            
        });

        //IMPRIME UNA RECETA YA SEA POR PDF O EMAIL
        recipeRouter.get('/', async (req, res, next) => {
            try {
                
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE PLAN SEMANAL SEGUN FILTRO
        recipeRouter.get('/', async (req, res, next) => {
            try {
                
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA NUEVA RECETA
        recipeRouter.post('/', async (req, res, next) => {
            try {
                
            } catch(error) {
                next(error)
            }            
        });     

        // recipeRouter.use((error, req, res, next) => {
        //     if (error.type == 'ERROR_INVALID_ID'){
        //         res.status(400)            
        //     }else if (error.type == 'ERROR_INVALID_SEND_FORMAT'){
        //         res.status(400)            
        //     }else if (error.type == 'BAD_REQUEST'){
        //         res.status(400)            
        //     }else if(error.type == 'ERROR_USER_NOT_FOUND'){
        //         res.status(404)
        //     }else{
        //         res.status(500)
        //     }
        //     res.json({message:error.message})
        // })
    
        return recipeRouter
    }

}

export default RecipeRouter

