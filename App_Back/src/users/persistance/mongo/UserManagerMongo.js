import NewUser from '../../business/models/User.js'
import {createErrorRequestBadFormat} from '../../../shared/errors/ErrorRequestBadFormat.js'

function crearUserManagerMongo(db) {

  const dbUsers = db.collection('Users')

  return {
    add: async (user) => {
      await dbUsers.insertOne(user)
      delete dbUsers._id
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
    getByEmail: async (email) => {
      return await dbUsers.findOne({email:email})
    },

    deleteById: async (id) => {
      const user = await this.getById({id:parseInt(user.id)})
      if(user){
          return {updated: 0}
      }else{
          await dbUsers.deleteOne({"id": user.id})
          return {updated: 1}
      }
    },

    async deleteInventoryById(inventory, inventoryId) {
      const indiceParaBorrar = inventory.findIndex(i => i.ingredient.id == inventoryId)
      if (indiceParaBorrar == -1) {
          return {deleted: 0}                
      }else{
          inventory.splice(indiceParaBorrar, 1)
          return {deleted: 1}
      }
     },

    updateById: async (user) => {
      dbUsers.replaceOne({"id": user.id},user)
      },
    cerrar: async () => {
      console.log('closing userManager from Mongo...')
      await db.close()
    }
  }
}

export { crearUserManagerMongo }
