import User from '../models/User.js'
import StockItem from '../models/StockItem.js'
import Ingredient from '../models/Ingredient.js'

class UserService {

    constructor(userManager) {
        this.users = userManager
        this.addTestData()
    }

    async add(user) {
        this.users.add(user)
    }

    async getAll() {
        return this.users.getAll()
    }

    async getById(id) {
        return this.users.getById(id)
    }

    async addTestData() {
        var self = this

        var ingredient = new Ingredient({
            name: 'Huevo',
            unit: 'unidad'
        })

        var stockItem = new StockItem({
            ingredient: ingredient,
            amount: 4
        })

        self.add(new User({
            name: 'Usuario',
            lastname: 'Test',
            email: 'gastongp93@gmail.com',
            password: '1234',
            inventory: {
                ingredient: stockItem.ingredient,
                amount: stockItem.amount
            }
        }))
    }
}

export default UserService