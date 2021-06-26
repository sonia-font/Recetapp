class Case_GetRecipes {

    constructor(recipeService) {
        this.recipeService = recipeService
    }

    async getRecipes() {
        return await this.recipeService.getAll()     
    }
}

export default Case_GetRecipes