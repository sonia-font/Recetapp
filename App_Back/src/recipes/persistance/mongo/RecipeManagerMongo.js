import NewRecipe from '../../business/models/Recipe.js'
import {createErrorRequestBadFormat} from '../../../shared/errors/ErrorRequestBadFormat.js'

function crearRecipeManagerMongo(db) {

  const dbRecipes = db.collection('Recipes')

  return {
    add: async (recipe) => {
        await dbRecipes.insertOne(recipe)
        delete dbRecipes._id
    },
    addUnique: async (recipe, id) => {
        const existe = await dbRecipes.some(r => {
            return r[id] == recipe[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbRecipes.push(recipe)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbRecipes.find({}).toArray()
        const recipes = await registros.map(r => {
          try {
            return new NewRecipe(r)
          } catch (err) {
            throw createErrorRequestBadFormat()
          }
        })
        return recipes
      },
    getById: async (id) => {
        return await dbRecipes.findOne({id:parseInt(id)})
    },

    getFiltered: async (params) => {
        let filteredRecipes = []

        if (params.keyWord != null && params.keyWord != "" && params.keyWord != " ") {
            if(filteredRecipes.length == 0){
                dbRecipes.createIndex({characteristics: "text"})
                filteredRecipes = await dbRecipes.find({ $text: { $search: params.keyWord } }).toArray()
            } else{
                filteredRecipes = filteredRecipes.filter(r => r.characteristics.includes(params.keyWord))
            }
        } 

        if(params.maxIngredients != null && params.maxIngredients > 0) {
            if(filteredRecipes.length == 0){
                dbRecipes.aggregate([
                    {ingredientSize: {$size: "$stockIngredients"}},
                ])
                const query = {ingredientSize: {$lte: parseInt(params.maxIngredients)}}

                filteredRecipes = await dbRecipes.find(query).toArray()
            } else {
                filteredRecipes = filteredRecipes.filter(r => r.stockIngredients.length <= params.maxIngredients)
            }
        }

        if(params.maxTime != null && params.maxTime > 0) {
            if(filteredRecipes.length == 0){
                const query = {time: {$lte: parseInt(params.maxTime)}}
                filteredRecipes = await dbRecipes.find(query).toArray()
            } else {
                filteredRecipes = filteredRecipes.filter(r => r.time <= params.maxTime)              
            }
        }

        if(params.difficulty != null) {
            if(filteredRecipes.length == 0){
                const query = {difficulty: params.difficulty}
                filteredRecipes = await dbRecipes.find(query).toArray()
            } else {
                filteredRecipes = filteredRecipes.filter(r => r.difficulty == params.difficulty)
            }
        }
        
    return filteredRecipes
    },
    deleteById: async (id) => {
        const indiceParaBorrar = dbRecipes.findIndex(r => r.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbRecipes.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (recipe) => {
        const indiceParaReemplazar = dbRecipes.findIndex(r => r.id == recipe.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbRecipes.splice(indiceParaReemplazar, 1, recipe)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('closing RecipeManager from Mongo...')
      await db.close()
    }
  }
}

export { crearRecipeManagerMongo }
