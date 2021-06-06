import Router from '../Router.js'

class RecipeRouter extends Router {

    //cuando instancie esto voy a tener el express router, el path y los servicios inicializados

    get(req,res,next){
        this.router.get(this.routePath, async () => {
            try{
                let recipes
                if(req.query.params){
                    recipes = await this.services.recipes.getFiltered(req.query.params)
                }else{
                    recipes = await this.services.recipes.getAll()
                }
                res.json(recipes)
            }catch(error){
                next(error)
            }
        })
    }

    post(req,res,next){
        this.router.post(this.routePath, async () => {
            try{
                const recipe = await this.services.recipes.add(req.body)
                res.status(201).json(recipe)
            }catch(error){
                next(error)
            }
        })
    }

    delete(req,res,next){
        this.router.delete(this.routePath + '/:id', async () => {
            try{
                await this.services.recipes.deleteById(req.params.id)
                res.status(204).end()
            }catch(error){
                next(error)
            }
        })
    }

    put(req,res,next){
        this.router.put(this.routePath + '/:id', async () => {
            try{
                const recipe = await this.services.recipes.updateById(req.body, req.params.id)
                res.json(recipe)
            }catch(error){
                next(error)
            }
        })
    }    
}

export default RecipeRouter