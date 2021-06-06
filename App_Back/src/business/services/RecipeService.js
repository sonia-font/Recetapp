class RecipeService {

    constructor(recipeManager){
        this.recipes = recipeManager
    }

    async add(recipe) {
        this.recipes.add(recipe)
    }
    async getAll() {
        return this.recipes.getAll()
    }
    async getFiltered(params) {
        return this.recipes.getFiltered(params)
    }
    async deleteById(id) {
        return this.recipes.deleteById(id)
    }
    async updateById(recipe) {
        return this.recipes.updateById(recipe)
    }
}

export default RecipeService