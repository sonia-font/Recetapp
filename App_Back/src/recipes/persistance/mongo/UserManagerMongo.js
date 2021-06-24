import NewUser from '../../business/models/User.js'
import {createErrorRequestBadFormat} from '../../../shared/errors/ErrorRequestBadFormat.js'

function crearUserManagerMongo(db) {

  const dbUsers = db.collection('Users')

  return {
    add: async (user) => {
        await dbUsers.insertOne(user)
        delete dbUsers._id
    },
    addUnique: async (user, id) => {
        const existe = await dbUsers.some(u => {
            return u[id] == user[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbUsers.push(user)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbUsers.find({}).toArray()
        const users = await registros.map(u => {
          try {
            return new NewUser(u)
          } catch (err) {
            throw createErrorRequestBadFormat()
          }
        })
        return users
      },
    getById: async (id) => {
        return await dbUsers.findOne({id:parseInt(id)})
    },
    deleteById: async (id) => {
        const indiceParaBorrar = await dbUsers.findIndex(u => u.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbUsers.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (user) => {
        const indiceParaReemplazar = await dbUsers.findIndex(u => u.id == user.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbUsers.splice(indiceParaReemplazar, 1, user)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('closing userManager from Mongo...')
      await db.close()
    }
  }
}


export { crearUserManagerMongo }
