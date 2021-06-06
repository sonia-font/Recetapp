class UserService {

    constructor(userManager){
        this.users = userManager
    }

    async add(user) {
        this.users.add(user)
    }
    async getAll() {
        return this.users.getAll()
    }
    async getByEmail(email) {
        return this.users.getByEmail(email)
    }
    async deleteByEmail(email) {
        return this.users.deleteByEmail(email)
    }
    async updateByEmail(user) {
        return this.users.updateByEmail(user)
    }
}

export default UserService