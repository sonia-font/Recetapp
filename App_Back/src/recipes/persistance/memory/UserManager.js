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
    async cerrar() {
        return console.log('cerrando manager de usuario en cache')
    }
}

export default UserManager