import { crearErrorClienteNoEncontrado } from '../../../shared/errors/ErrorClienteNoEncontrado.js'

function crearRecipeManagerMongo(db) {

  const dbRecipes = db.collection('Recipe')

  return {
    add: async (recipe) => {
        await dbRecipes.insertOne(recipe)
        delete dbRecipes._id
    },
    addUnique: async (recipe, id) => {
        const existe = dbRecipes.some(r => {
            return r[id] == recipe[id]
        })
        if(existe){
            return {added:0}
        }else{
            dbRecipes.push(recipe)
            return {added:1}
        }
    },
    getAll: async () => {
        return await dbRecipes.findMany({}).toArray()
    },
    getById: async (id) => {
        return dbRecipes.filter(r => r.id == id)
    },
    deleteById: async (id) => {
        const indiceParaBorrar = dbRecipes.findIndex(r => r.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            dbRecipes.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (recipe) => {
        const indiceParaReemplazar = dbRecipes.findIndex(r => r.id == recipe.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            dbRecipes.splice(indiceParaReemplazar, 1, recipe)
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
