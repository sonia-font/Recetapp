import express from 'express'
import CUFactory from '../test/caseFactory/CUFactory.js'

class TestRouter {

    constructor(){
        this.factory = new CUFactory()
        const testRouter = express.Router()
        const cuUploadRecipe = this.factory.createCase_UploadRecipe()
        const cuGetRecipes = this.factory.createCase_GetRecipes()
        const cuGetBuyList = this.factory.createCase_GetBuyList()
        const cuGetPdfOrEmailRecipe = this.factory.createCase_GetPdfOrEmailRecipe()
        const cuGetWeekPlan = this.factory.createCase_GetWeekPlan()

        testRouter.get('/', async (req, res, next) => {
            try {
                const recipes = await (await cuGetRecipes).getRecipes()
                res.json(recipes)
            } catch(error) {
                next(error)
            }            
        });

        testRouter.post('/upload', async (req, res, next) => {
            try {
                (await cuUploadRecipe).upload(req)
                res.status(201).send({msg: 'Recipe Uploaded!'})
            } catch(error) {
                next(error)
            }            
        });     

        testRouter.post('/buylist', async(req, res, next) => {
            try {
                await (await cuGetBuyList).getMissingIngredients(req.query.idRecipe, req.query.idUser)
                res.status(200).send({msg: 'BuyList Sent!'})
            } catch(error) {
                next(error)
            }            
        })

        testRouter.post('/start', async (req, res, next) => {
            try {
                await (await cuGetPdfOrEmailRecipe).selectPdfOrEmailRecipe(req.query.idRecipe, req.query.idUser, req.query.format)
                res.status(200).send({msg: 'Receta iniciada'})
            } catch(error) {
                next(error)
            }    
        })

        testRouter.post('/:idUser/weekPlan',async (req, res, next) =>{
            try {
                await (await cuGetWeekPlan).list({
                    idUser: req.params.idUser,
                    keyWord: req.query.keyWord,
                    maxIngredients: req.query.maxIngredients,
                    maxTime: req.query.maxTime,
                    difficulty: req.query.difficulty
                })
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }         
        })

        testRouter.use((error, req, res, next) => {
            if (error.type == 'ERROR_INVALID_ID'){
                res.status(400)            
            }else if (error.type == 'ERROR_INVALID_SEND_FORMAT'){
                res.status(400)            
            }else if (error.type == 'BAD_REQUEST'){
                res.status(400)            
            }else if(error.type == 'ERROR_USER_NOT_FOUND'){
                res.status(404)
            }else{
                res.status(500)
            }
            res.json({message:error.message})
        })
    
        return testRouter
    }
}

export default TestRouter

