import { crearErrorClienteNoEncontrado } from '../../../shared/errors/ErrorClienteNoEncontrado.js'

function crearIngredientManagerMongo(db) {

  const dbIngredient = db.collection('Ingredient')

  return {
    getById: async (id) => {
      const buscado = await dbIngredient.findOne({ id })
      if (buscado) {
        console.log('ingrediente encontrado!')
        return buscado
      } else {
        // throw new Error('cliente no encontrado')
        throw crearErrorClienteNoEncontrado()
      }
    },
    cerrar: async () => {
      console.log('cerrando ingredientes manager mongo...')
      await db.close()
    }
  }
}

export { crearIngredientManagerMongo }
