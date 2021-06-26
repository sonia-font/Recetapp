import express from 'express'

class IngredientRouter {

    constructor(ingredientService){
        this.ingredientService = ingredientService
    }

    createIngredientRouter(){
        const ingredientRouter = express.Router()

        //DEVUELVE TODOS LOS INGREDIENTES PARA LA LISTA
        ingredientRouter.get('/', async (req, res, next) => {
            try {
                const ingredients = await this.ingredientService.getAll()
                res.status(200).json(ingredients)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE INGREDIENTE POR ID, SERVIRIA PARA PRECARGAR LA UNIDAD DEL INGREDIENTE ELEGIDO CUANDO X EJ SE AGREGA AL INVENTORY
        ingredientRouter.get('/:idIngredient', async (req, res, next) => {
            try {
                const ingredient = await this.ingredientService.getById(req.params.idIngredient)
                res.status(200).json(ingredient)        
            } catch(error) {
                next(error)
            }            
        });
    
        return ingredientRouter
    }
}

export default IngredientRouter

