class IngredientService {

    constructor(ingredientManager) {
        this.ingredients = ingredientManager
    }

    async add(ingredient) {
        await this.ingredients.add(ingredient)
    }

    async getAll() {
        return await this.ingredients.getAll()
    }

    async getById(id) {
        return await this.ingredients.getById(id)
    }

    async deleteById(id) {
        return await this.ingredients.deleteById(id)
    }

    async updateById(ingredient) {
        return await this.ingredients.updateById(ingredient)
    }
}

export default IngredientService