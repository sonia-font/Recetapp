import NewIngredient from '../../business/models/Ingredient.js'
import {createErrorRequestBadFormat} from '../../../shared/errors/ErrorRequestBadFormat.js'

function crearIngredientManagerMongo(db) {

  const dbIngredients = db.collection('Ingredients')

  return {
    add: async (ingredient) => {
        await dbIngredients.insertOne(ingredient)
        delete dbIngredients._id
    },
    addUnique: async (ingredient, id) => {
        const existe = await dbIngredients.some(i => {
            return i[id] == ingredient[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbIngredients.push(ingredient)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbIngredients.find({}).toArray()
        const ingredients = await registros.map(i => {
          try {
            return new NewIngredient(i)
          } catch (err) {
            throw createErrorRequestBadFormat()
          }
        })
        return ingredients
      },
    getById: async (id) => {
        return await dbIngredients.findOne({id:parseInt(id)})
    },
    deleteById: async (id) => {
        const indiceParaBorrar = await dbIngredients.findIndex(i => i.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbIngredients.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (ingredient) => {
        const indiceParaReemplazar = await dbIngredients.findIndex(i => i.id == ingredient.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbIngredients.splice(indiceParaReemplazar, 1, ingredient)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('closing ingredientManager from Mongo...')
      await db.close()
    }
  }
}

export { crearIngredientManagerMongo }
