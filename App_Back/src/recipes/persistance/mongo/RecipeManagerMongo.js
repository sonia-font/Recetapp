import { crearErrorClienteNoEncontrado } from '../../../shared/errors/ErrorClienteNoEncontrado.js'

function crearRecipeManagerMongo(db) {

  const dbRecipe = db.collection('Recipe')

  return {
    getById: async (id) => {
      const buscado = await dbRecipe.findOne({ id })
      if (buscado) {
        console.log('receta encontrada!')
        return buscado
      } else {
        // throw new Error('cliente no encontrado')
        throw crearErrorClienteNoEncontrado()
      }
    },
    cerrar: async () => {
      console.log('cerrando recetas manager mongo...')
      await db.close()
    }
  }
}

export { crearRecipeManagerMongo }
