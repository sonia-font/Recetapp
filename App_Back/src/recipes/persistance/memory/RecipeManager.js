class RecipeManager {    

    constructor() {
        this.recipes = [];
    }

    async add(recipe) {
        this.recipes.push(recipe)
    }

    async getAll() {
        return this.recipes
    }

    async getById(id) {
        return this.recipes.find((recipe) => recipe.id == id)
    }

    async getFiltered(params) {
        let filteredRecipes = []

        if (params.keyWord != null && params.keyWord != "" && params.keyWord != " ") {
            if(filteredRecipes.length == 0){
                filteredRecipes = this.recipes.filter((recipe) => recipe.characteristics.includes(params.keyWord))
            } else{
                filteredRecipes = filteredRecipes.filter((recipe) => recipe.characteristics.includes(params.keyWord))
            }
        } 

        if(params.maxIngredients != null && params.maxIngredients > 0) {
            if(filteredRecipes.length == 0){
                filteredRecipes = this.recipes.filter((recipe) => recipe.stockIngredients.length <= params.maxIngredients)
            } else {
                filteredRecipes = filteredRecipes.filter((recipe) => recipe.stockIngredients.length <= params.maxIngredients)
            }
        }

        if(params.maxTime != null && params.maxTime > 0) {
            if(filteredRecipes.length == 0){
                filteredRecipes = this.recipes.filter((recipe) => recipe.time <= params.maxTime)              
            } else {
                filteredRecipes = filteredRecipes.filter((recipe) => recipe.time <= params.maxTime)              
            }
        }

        if(params.difficulty != null) {
            if(filteredRecipes.length == 0){
                filteredRecipes = this.recipes.filter((recipe) => recipe.difficulty == params.difficulty)
            } else {
                filteredRecipes = filteredRecipes.filter((recipe) => recipe.difficulty == params.difficulty)
            }
        }
        
    return filteredRecipes
    }

    async deleteById(id) {
        const indiceParaBorrar = this.recipes.findIndex(r => r.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            this.recipes.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    }
    
    async updateById(recipe) {
        const indiceParaReemplazar = this.recipes.findIndex(r => r.id == recipe.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            this.recipes.splice(indiceParaReemplazar, 1, recipe)
            return {updated: 1}
        }
    }

    async cerrar() {
        return console.log('cerrando manager de recetas en cache')
    }
}

export default RecipeManager