import Router from '../Router.js'

class IngredientRouter extends Router {

    //cuando instancie esto voy a tener el express router, el path y los servicios inicializados

    get(req,res,next){
        this.router.get(this.routePath, async () => {
            try{
                let ingredients
                if(req.query.id){
                    ingredients = await this.services.ingredients.getById(req.query.id)
                }else{
                    ingredients = await this.services.ingredients.getAll()
                }
                res.json(ingredients)
            }catch(error){
                next(error)
            }
        })
    }

    post(req,res,next){
        this.router.post(this.routePath, async () => {
            try{
                const ingredient = await this.services.ingredients.add(req.body)
                res.status(201).json(ingredient)
            }catch(error){
                next(error)
            }
        })
    }

    delete(req,res,next){
        this.router.delete(this.routePath + '/:id', async () => {
            try{
                await this.services.ingredients.deleteById(req.params.id)
                res.status(204).end()
            }catch(error){
                next(error)
            }
        })
    }

    put(req,res,next){
        this.router.put(this.routePath + '/:id', async () => {
            try{
                const ingredient = await this.services.ingredients.updateById(req.body, req.params.id)
                res.json(ingredient)
            }catch(error){
                next(error)
            }
        })
    }    
}

export default IngredientRouter