
function crearIngredientManagerMongo(db) {

  const dbIngredients = db.collection('Ingredient')

  return {
    add: async (ingredient) => {
        await dbIngredients.insertOne(ingredient)
        delete dbIngredients._id
    },
    addUnique: async (ingredient, id) => {
        const existe = dbIngredients.some(i => {
            return i[id] == ingredient[id]
        })
        if(existe){
            return {added:0}
        }else{
            dbIngredients.push(ingredient)
            return {added:1}
        }
    },
    getAll: async () => {
        return await dbIngredients.findMany({}).toArray()
    },
    getById: async (id) => {
        return dbIngredients.filter(i => i.id == id)
    },
    deleteById: async (id) => {
        const indiceParaBorrar = dbIngredients.findIndex(i => i.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            dbIngredients.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (ingredient) => {
        const indiceParaReemplazar = dbIngredients.findIndex(i => i.id == ingredient.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            dbIngredients.splice(indiceParaReemplazar, 1, ingredient)
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
