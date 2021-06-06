class UserManager {    

    constructor() {
        this.users = []
    }

    constructor(db) {
        this.users = db
    }

    async add(user) {
        this.users.add(user)
    }
    async getAll() {
        return this.users
    }
    async getByEmail(email) {
        return this.users.filter(u => u.email == email)
    }
    async deleteByEmail(email) {
        const index = this.users.findIndex(u => u.email == email)
        if (index == -1) {
            return {deleted: 0}                
        }else{
            this.users.splice(index, 1)
            return {deleted: 1}
        }
    }
    async updateByEmail(user) {
        const index = this.users.findIndex(u => u.email == user.email)
        if (index == -1) {
            return {updated: 0}                
        }else{
            this.users.splice(index, 1, user)
            return {updated: 1}
        }
    }
}

export default UserManager