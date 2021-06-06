class RecipeManager {    

    constructor() {
        this.recipes = []
    }

    constructor(db) {
        this.recipes = db
    }

    async add(recipe) {
        this.recipes.add(recipe)
    }
    async getAll() {
        return this.recipes
    }
    async getFiltered(params) {
        //TODO
    }
    async deleteById(id) {
        const index = this.recipes.findIndex(r => r.id == id)
        if (index == -1) {
            return {deleted: 0}                
        }else{
            this.recipes.splice(index, 1)
            return {deleted: 1}
        }
    }
    async updateById(recipe) {
        const index = this.recipes.findIndex(r => r.id == recipe.id)
        if (index == -1) {
            return {updated: 0}                
        }else{
            this.recipes.splice(index, 1, recipe)
            return {updated: 1}
        }
    }
}

export default RecipeManager