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
}

export default UserManager