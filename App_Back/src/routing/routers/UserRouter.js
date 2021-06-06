import Router from '../Router.js'

class UserRouter extends Router {

    //cuando instancie esto voy a tener el express router, el path y los servicios inicializados

    get(req,res,next){
        this.router.get(this.routePath, async () => {
            try{
                let users
                if(req.query.email){
                    users = await this.services.users.getByEmail(req.query.email)
                }else{
                    users = await this.services.users.getAll()
                }
                res.json(users)
            }catch(error){
                next(error)
            }
        })
    }

    post(req,res,next){
        this.router.post(this.routePath, async () => {
            try{
                const user = await this.services.users.add(req.body)
                res.status(201).json(user)
            }catch(error){
                next(error)
            }
        })
    }

    delete(req,res,next){
        this.router.delete(this.routePath + '/:email', async () => {
            try{
                await this.services.users.deleteByEmail(req.params.email)
                res.status(204).end()
            }catch(error){
                next(error)
            }
        })
    }

    put(req,res,next){
        this.router.put(this.routePath + '/:email', async () => {
            try{
                const user = await this.services.users.updateByEmail(req.body, req.params.email)
                res.json(user)
            }catch(error){
                next(error)
            }
        })
    }    
}

export default UserRouter