import express from 'express'
import User from '../business/models/User.js';
import StockItem from '../../shared/models/StockItem.js'
import Ingredient from '../../ingredients/business/models/Ingredient.js'

class UserRouter {

    constructor(userService){
        this.userService = userService
        const userRouter = express.Router()

        //DEVUELVE TODOS LOS USUARIO SI SE LLEGA A NECESITAR
        userRouter.get('/', async (req, res, next) => {
            try {
                const users = await this.userService.getAll()
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(users)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE USUARIO CON ID
        userRouter.get('/:idUser', async (req, res, next) => {
            try {
                const user = await this.userService.getById(req.params.idUser)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(user)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE ID USUARIO CON EMAIL
        userRouter.get('/:email', async (req, res, next) => {
            try {
                const user = await this.userService.getByEmail(req.params.email)
				res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(user.id)
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA NUEVO USUARIO CON LA DATA DE GOOGLE
        userRouter.post('/', async (req, res, next) => {
            try {
                const user = await this.userService.getByEmail(req.body.email)
                if(!user) {
                    const newUser = new User({
                        name: req.body.name,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        inventory: []
                    })
                    await this.userService.add(newUser)    
                    const createdUser = await this.userService.getByEmail(req.body.email)                
					res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(201).json(createdUser.id)
                } else {
					res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(409).json(user.id)
                }                
            } catch(error) {
                next(error)
            }            
        });

        //ELIMINA ELEMENTO DE USUARIO
        userRouter.get('/:idUser/inventory/:inventoryId', async (req, res, next) => {
            try {
                await this.userService.deleteUserInventory(req.params.idUser,req.params.inventoryId)
                const inventory = await this.userService.getUserInventory(req.params.idUser)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(inventory)
            } catch(error) {
                next(error)
            }            
        });
        

        //DEVUELVE INVENTARIO
        userRouter.get('/:idUser/inventory', async (req, res, next) => {
            try {
                const inventory = await this.userService.getUserInventory(req.params.idUser)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).json(inventory)
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA STOCK AL INVENTARIO
        userRouter.post('/:idUser/inventory', async (req, res, next) => {
            try {
                const ingredient = new Ingredient({
                    name: req.body.ingredient.name,
                    unit: req.body.ingredient.unit
                })
        
                const stockItem = new StockItem({
                    ingredient: ingredient,
                    amount: req.body.amount
                })

                const newItem = {
                    ingredient: stockItem.ingredient,
                    amount: stockItem.amount
                }

                const user = await this.userService.getById(req.params.idUser)
                user.inventory.push(newItem)
                await this.userService.updateUserInventory(req.params.idUser, user.inventory)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send({msg: 'Inventory updated!'})
            } catch(error) {
                next(error)
            }            
        });
        
        
    
        return userRouter
    }
}

export default UserRouter

