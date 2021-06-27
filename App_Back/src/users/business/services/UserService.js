import User from '../models/User.js'
import StockItem from '../../../shared/models/StockItem.js'
import Ingredient from '../../../ingredients/business/models/Ingredient.js'

class UserService {

    constructor(userManager) {
        this.users = userManager
        this.addTestData()
    }

    async add(user) {
        //TODO: VER QUE VUELVE Y CREAR UN OBJETO USER
        await this.users.add(user)
    }

    async getAll() {
        return await this.users.getAll()
    }

    async getById(id) {
        const user = await this.users.getById(id)
        return user
    }

    async getByEmail(email) {
        const user = await this.users.getByEmail(email)
        return user
    }

    async deleteById(id) {
        return await this.users.deleteById(id)
    }

    async updateById(user) {
        return await this.users.updateById(user)
    }

    async getUserInventory(id) {
        const self = this
        const user = await self.getById(id)
        return await user.inventory
    }

    async updateUserInventory(id, inventory) {
        const self = this
        const user = await self.getById(id)
        user.inventory = inventory

        return await this.users.updateById(user)
    }

    async deleteUserInventory(id, inventoryId) {
        const self = this
        const user = await self.getById(id)
        this.users.deleteInventoryById(user.inventory,inventoryId)
        return await this.users.updateById(user)
    }

    async addTestData() {
        const self = this

        const ingredient = new Ingredient({
            name: 'Huevo',
            unit: 'unidad'
        })

        const stockItem = new StockItem({
            ingredient: ingredient,
            amount: 4
        })
        
        const ingredient2 = new Ingredient({
            name: 'Palta',
            unit: 'unidad'
        })

        const stockItem2 = new StockItem({
            ingredient: ingredient2,
            amount: 1
        })

        await self.add(new User({
            name: 'Usuario',
            lastname: 'Test',
            email: 'gastongp93@gmail.com',
            password: '1234',
            inventory: [{
                ingredient: stockItem.ingredient,
                amount: stockItem.amount
            },
            {   
                ingredient: stockItem2.ingredient,
                amount: stockItem2.amount
            }]
        }))
    }
}

export default UserService