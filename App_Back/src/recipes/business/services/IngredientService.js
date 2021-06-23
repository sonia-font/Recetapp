import ingredients from '../models/Ingredient.js'

class IngredientService {

    constructor(ingredientManager) {
        this.ingredients = ingredientManager
    }

    async add(ingredient) {
        this.ingredients.add(ingredient)
    }

    async getAll() {
        return this.ingredients.getAll()
    }

    async getById(id) {
        return this.ingredients.getById(id)
    }
}

export default IngredientService