import express from 'express'

class UserRouter {

    constructor(userService){
        this.userService = userService
    }

    createUserRouter(){
        const userRouter = express.Router()

        //DEVUELVE TODOS LOS USUARIO SI SE LLEGA A NECESITAR
        userRouter.get('/', async (req, res, next) => {
            try {
                const users = await this.userService.getAll()
                res.status(200).json(user)
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE USUARIO CON ID
        userRouter.get('/:idUser', async (req, res, next) => {
            try {
                const user = await this.userService.getById(req.params.idUser)
                res.status(200).json(user)
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA NUEVO USUARIO CON LA DATA DE GOOGLE
        userRouter.post('/', async (req, res, next) => {
            try {
                await this.userService.add(req.body)
                res.status(201).send({msg: 'User created!'})
            } catch(error) {
                next(error)
            }            
        });

        //DEVUELVE INVENTARIO
        userRouter.get('/:idUser/inventory', async (req, res, next) => {
            try {
                const inventory = await this.userService.getUserInventory(req.params.idUser)
                res.status(200).json(inventory)
            } catch(error) {
                next(error)
            }            
        });

        //AGREGA STOCK AL INVENTARIO
        userRouter.put('/:idUser/inventory', async (req, res, next) => {
            try {
                await this.userService.updateUserInventory(req.params.idUser, req.body)
                res.status(200).send({msg: 'Inventory updated!'})
            } catch(error) {
                next(error)
            }            
        });
    
        return userRouter
    }
}

export default UserRouter

