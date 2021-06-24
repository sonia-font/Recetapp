import { crearErrorClienteNoEncontrado } from '../../../shared/errors/ErrorClienteNoEncontrado.js'

function crearUserManagerMongo(db) {

  const dbUser = db.collection('User')

  return {
    getById: async (id) => {
      const buscado = await dbUser.findOne({ id })
      if (buscado) {
        console.log('cliente encontrado!')
        return buscado
      } else {
        // throw new Error('cliente no encontrado')
        throw crearErrorClienteNoEncontrado()
      }
    },
    cerrar: async () => {
      console.log('cerrando usuario manager mongo...')
      await db.close()
    }
  }
}

export { crearUserManagerMongo }
