
function crearUserManagerMongo(db) {

  const dbUsers = db.collection('Users')

  return {
    add: async (user) => {
        await dbUsers.insertOne(user)
        delete dbUsers._id
    },
    addUnique: async (user, id) => {
        const existe = dbUsers.some(u => {
            return u[id] == user[id]
        })
        if(existe){
            return {added:0}
        }else{
            dbUsers.push(user)
            return {added:1}
        }
    },
    getAll: async () => {
        return await dbUsers.findMany({}).toArray()
    },
    getById: async (id) => {
        return dbUsers.filter(u => u.id == id)
    },
    deleteById: async (id) => {
        const indiceParaBorrar = dbUsers.findIndex(u => u.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            dbUsers.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (user) => {
        const indiceParaReemplazar = dbUsers.findIndex(u => u.id == user.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            dbUsers.splice(indiceParaReemplazar, 1, user)
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
