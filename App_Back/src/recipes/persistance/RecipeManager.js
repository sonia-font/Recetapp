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

        if (params.keyWord != null) {
            filteredRecipes = this.recipes.filter((recipe) => recipe.characteristics.includes(params.keyWord))
       //     filteredRecipes.push.apply(filteredRecipes,)
        //     if(filteredRecipes.length > 0) {
        //         filteredRecipes = filteredRecipes.filter((recipe) => recipe.characteristics.includes(params.keyWord))
        //     } else {
        //         console.log(filteredRecipes.length)
        //     }       
        } 

        if(params.maxIngredients != null) {
            filteredRecipes = this.recipes.filter((recipe) => recipe.stockIngredients.length <= params.maxIngredients)
            // if(filteredRecipes.length > 0) {
            //     filteredRecipes = filteredRecipes.filter((recipe) => recipe.stockIngredients.length <= params.maxIngredients)
            // } else {
            // }  
        }

        if(params.maxTime != null) {
            filteredRecipes =this.recipes.filter((recipe) => recipe.time <= params.maxTime)
            // if(filteredRecipes.length > 0) {
            //     filteredRecipes = filteredRecipes.filter((recipe) => recipe.time <= params.maxTime)
            // } else {
            // }  
        }

        if(params.difficulty != null) {
            filteredRecipes = this.recipes.filter((recipe) => recipe.difficulty == params.difficulty)
            // if(filteredRecipes.length > 0) {
            //     filteredRecipes = filteredRecipes.filter((recipe) => recipe.difficulty == params.difficulty)
            // } else {
            // }  
        }
    return filteredRecipes
    }
}

export default RecipeManager