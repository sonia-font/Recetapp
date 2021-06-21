import Recipe from '../models/Recipe.js'
import StockItem from '../models/StockItem.js'
import Ingredient from '../models/Ingredient.js'

class RecipeService {

    constructor(recipeManager) {
        this.recipes = recipeManager
        this.addTestData()
    }

    async add(recipe) {
        await this.recipes.add(recipe)
    }

    async getAll() {
        return await this.recipes.getAll()
    }

    async getById(id) {
        return await this.recipes.getById(id)
    }

    async getFiltered(params) {
        return await this.recipes.getFiltered(params)
    }

    async addTestData() {
        var self = this

        var ingredient = new Ingredient({
            name: 'Huevo',
            unit: 'unidad'
        })

        var stockItem = new StockItem({
            ingredient: ingredient,
            amount: 3
        })

        self.add(new Recipe({
            title: '3 Huevos',
            image: '..\\uploads/huevos.jpg',
            plates: 3,
            time: 15,
            difficulty: 'Facil',
            characteristics: 'Simple, Economico, Vegetariano',
            stockIngredients: {
                ingredient: stockItem.ingredient,
                amount: stockItem.amount
            }
        }))
    }
}

export default RecipeService