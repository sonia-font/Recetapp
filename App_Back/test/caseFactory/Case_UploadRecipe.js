class Case_UploadRecipe {

    constructor(parseService, recipeService) {
        this.parseService = parseService,
        this.recipeService = recipeService
    }

    async upload(req) {
        const newRecipe = await this.parseService.parseRecipe(req) 
        await this.recipeService.add(newRecipe)                
    }
}

export default Case_UploadRecipe