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

        const ingredient1 = new Ingredient({
            name: 'cebolla grande',
            unit: 'unidad'
        })
        const ingredient2 = new Ingredient({
            name: 'rodajas de merluza',
            unit: 'unidad'
        })
        const ingredient3 = new Ingredient({
            name: 'puñado de perejil',
            unit: 'unidad'
        })
        const ingredient4 = new Ingredient({
            name: 'dientes de ajos',
            unit: 'unidad'
        })
        const ingredient5 = new Ingredient({
            name: 'vino blanco',
            unit: 'unidad'
        })
        const ingredient6 = new Ingredient({
            name: 'caldo de pescado',
            unit: 'unidad'
        })
        const ingredient7 = new Ingredient({
            name: 'cucharada postre de harina de trigo o maicena',
            unit: 'unidad'
        })

        const stockItem = new StockItem({
            ingredient: ingredient1,
            amount: 1
        })
        const stockItem2 = new StockItem({
            ingredient: ingredient2,
            amount: 8
        })
        const stockItem3 = new StockItem({
            ingredient: ingredient3,
            amount: 1
        })
        const stockItem4 = new StockItem({
            ingredient: ingredient4,
            amount: 2
        })
        const stockItem5 = new StockItem({
            ingredient: ingredient5,
            amount: 3
        })
        const stockItem6 = new StockItem({
            ingredient: ingredient6,
            amount: 1
        })
        const stockItem7 = new StockItem({
            ingredient: ingredient7,
            amount: 4
        })
        self.add(new User({
            name: 'Usuario',
            lastname: 'Test',
            email: 'gastongp93@gmail.com',
            password: '1234',
            inventory: [{
                ingredient: stockItem.Ingredient,
                amount: stockItem.amount
            },
            {
                ingredient: stockItem2.Ingredient,
                amount: stockItem2.amount
            },
            {
                ingredient: stockItem3.Ingredient,
                amount: stockItem3.amount
            },
            {
                ingredient: stockItem4.Ingredient,
                amount: stockItem4.amount
            },
            {
                ingredient: stockItem5.Ingredient,
                amount: stockItem5.amount
            },
            {
                ingredient: stockItem6.Ingredient,
                amount: stockItem6.amount
            },
            {
                ingredient: stockItem7.ingredient,
                amount: stockItem7.amount
            }]
        }))
    }
}

export default UserService