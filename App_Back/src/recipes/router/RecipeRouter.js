import express from 'express'
import filter from '../../shared/models/Filter.js'
import PdfMaker from '../../shared/pdfmaker/PdfMaker.js';
import generatePdfBody from '../../shared/services/GeneratePdfBody.js';
import {crearMailer} from "../../shared/mails/Factory_Mailer.js"
import configMailer from "../../shared/mails/config.js"
import generateEmailBody from '../../shared/services/GenerateEmailBody.js';
import listRecipes from '../../shared/services/ListService.js';
import ParseService from '../../shared/parser/ParseService.js';
import Recipe from '../business/models/Recipe.js';
import StockItem from '../../shared/models/StockItem.js';
import Ingredient from '../../ingredients/business/models/Ingredient.js';

class RecipeRouter {

    constructor(recipeService, userService){
        this.recipeService = recipeService       
        this.userService = userService   
        const recipeRouter = express.Router()

        //DEVUELVE TODAS LAS RECETAS PARA LA VISTA GENERAL
        recipeRouter.get('/', async (req, res, next) => {
            try {
                const recipes = await this.recipeService.getAll()
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(recipes)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE RECETAS SEGUN FILTRO
        recipeRouter.get('/filter', async (req, res, next) => {
            try {
                const params = new filter(
                    req.query.keyWord,
                    req.query.maxIngredients,
                    req.query.maxTime,
                    req.query.difficulty
                )
                const recipes = await this.recipeService.getFiltered(params)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(recipes)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE UNA RECETA POR ID
        recipeRouter.get('/:idRecipe', async (req, res, next) => {
            try {
                const recipe = await this.recipeService.getById(req.params.idRecipe)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(recipe)   
            } catch(error) {
                next(error)
            }            
        });

        //IMPRIME UNA RECETA EN PDF
        recipeRouter.post('/:idRecipe/pdf', async (req, res, next) => {
            try {
                const recipe = await this.recipeService.getById(req.params.idRecipe)

                const pdfMaker = new PdfMaker()   
                pdfMaker.generate(generatePdfBody(recipe), 'receta.pdf')
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send({msg: 'Receta generada'})
            } catch(error) {
                next(error)
            }            
        });

        //ENVIA UNA RECETA POR EMAIL
        recipeRouter.post('/:idRecipe/send', async (req, res, next) => {
            try {
                const mailer = crearMailer(configMailer.configPrintRecipe)
                const user = await this.userService.getById(req.query.idUser);
                const recipe = await this.recipeService.getById(req.params.idRecipe)

                generateEmailBody(recipe)
                await mailer.send(user.email)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send({msg: 'Receta enviada'})
            } catch(error) {
                next(error)
            }            
        });

        //ENVIA PLAN SEMANAL SEGUN FILTRO
        recipeRouter.post('/plan/:idUser', async (req, res, next) => {
            try {                   
                const params = new filter(
                    req.query.keyWord,
                    req.query.maxIngredients,
                    req.query.maxTime,
                    req.query.difficulty
                )
                const recipes = await this.recipeService.getFiltered(params)
                const recipeList = await listRecipes(recipes)
                
                const user = await this.userService.getById(req.params.idUser)
                const mailer = crearMailer(configMailer.configWeeklyPlan)
                await mailer.send(user.email, recipeList)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send({msg: "Plan Enviado"})
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA NUEVA RECETA CON FORMULARIO
        recipeRouter.post('/', async (req, res, next) => {
            try {
                const parser = new ParseService()
                const newRecipe = await parser.parseRecipe(req) 

                await this.recipeService.add(newRecipe)   
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(201).send({msg: 'Recipe Uploaded!'})
            } catch(error) {
                next(error)
            }            
        });     

        //AGREGA NUEVA RECETA
        recipeRouter.post('/test', async (req, res, next) => {
            try {
                const newRecipe = new Recipe({
                    title: req.body.title,
                    image: req.body.image,
                    plates: req.body.plates,
                    time: req.body.time,
                    difficulty: req.body.difficulty,
                    characteristics: req.body.characteristics,
                    stockIngredients: req.body.stockIngredients
                })
                await this.recipeService.add(newRecipe)   
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(201).send({msg: 'Recipe created!'})
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

