class IngredientService {

    constructor(ingredientManager){
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
    async deleteById(id) {
        return this.ingredients.deleteById(id)
    }
    async updateById(ingredient) {
        return this.ingredients.updateById(ingredient)
    }
}

export default IngredientService