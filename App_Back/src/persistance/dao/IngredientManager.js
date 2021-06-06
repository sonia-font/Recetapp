class IngredientManager {    

    constructor() {
        this.ingredients = []
    }

    constructor(db) {
        this.ingredients = db
    }

    async add(ingredient) {
        this.ingredients.add(ingredient)
    }
    async getAll() {
        return this.ingredients
    }
    async getById(id) {
        return this.ingredients.filter(i => i.id == id)
    }
    async deleteById(id) {
        const index = this.ingredients.findIndex(i => i.id == id)
        if (index == -1) {
            return {deleted: 0}                
        }else{
            this.ingredients.splice(index, 1)
            return {deleted: 1}
        }
    }
    async updateById(ingredient) {
        const index = this.ingredients.findIndex(i => i.id == ingredient.id)
        if (index == -1) {
            return {updated: 0}                
        }else{
            this.ingredients.splice(index, 1, ingredient)
            return {updated: 1}
        }
    }
}

export default IngredientManager