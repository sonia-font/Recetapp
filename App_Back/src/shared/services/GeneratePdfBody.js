async function generatePdfBody(recipe){
    const recipeToSend = []

    recipeToSend.push([recipe.title,""])
    recipe.stockIngredients.forEach(item => {
        recipeToSend.push([item.ingredient.name, item.amount])
    });

    return recipeToSend
}

export default generatePdfBody