class UserManager {    

    constructor() {
        this.users = [];
    }

    async add(user) {
        this.users.push(user)
    }

    async getAll() {
        return this.users
    }

    async getById(id) {
        return this.users.find((user) => user.id == id)
    }

    async deleteById(id) {
        const indiceParaBorrar = this.users.findIndex(u => u.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            this.users.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    }
      
    async updateById(user) {
        const indiceParaReemplazar = this.users.findIndex(u => u.id == user.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            this.users.splice(indiceParaReemplazar, 1, user)
            return {updated: 1}
        }
    }

    async cerrar() {
        return console.log('cerrando manager de usuario en cache')
    }
}

export default UserManager