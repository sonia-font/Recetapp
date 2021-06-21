class IngredientManager {    

    constructor() {
        this.ingredients = [];
    }

    async add(ingredient) {
        this.ingredients.push(ingredient)
    }

    async getAll() {
        return this.ingredients
    }

    async getById(id) {
        return this.ingredients.find((ingredient) => ingredient.id == id)
    }
}

export default IngredientManager