import express from 'express'
import Ingredient from '../business/models/Ingredient.js';

class IngredientRouter {

    constructor(ingredientService){
        this.ingredientService = ingredientService
        const ingredientRouter = express.Router()

        //DEVUELVE TODOS LOS INGREDIENTES PARA LA LISTA
        ingredientRouter.get('/', async (req, res, next) => {
            try {
                const ingredients = await this.ingredientService.getAll()
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(ingredients)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE INGREDIENTE POR ID, SERVIRIA PARA PRECARGAR LA UNIDAD DEL INGREDIENTE ELEGIDO CUANDO X EJ SE AGREGA AL INVENTORY
        ingredientRouter.get('/:idIngredient', async (req, res, next) => {
            try {
                const ingredient = await this.ingredientService.getById(req.params.idIngredient)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(ingredient)        
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA NUEVO INGREDIENTE
        ingredientRouter.post('/test', async (req, res, next) => {
            try {
                const newIngredient = new Ingredient({
                    name: req.query.name,
                    unit: req.query.unit
                })
                await this.ingredientService.add(newIngredient)   
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(201).send({msg: 'Ingredient created!'})
            } catch(error) {
                next(error)
            }            
        }); 
    
        return ingredientRouter
    }

}

export default IngredientRouter

