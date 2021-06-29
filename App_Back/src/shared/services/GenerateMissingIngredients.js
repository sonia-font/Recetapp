async function generateMissingIngredients(inventory, recipe){    

    const missingIngredients = [];

    missingIngredients.push([recipe.title, "", ""]);

    missingIngredients.push([{ text: 'Ingredientes', bold: true }, { text: 'Cantidad', bold: true }, ""]);

    recipe.stockIngredients.forEach(stockIngredient => {
        //busca cada ingrediente de la recipe en el inventario del usuario
        const ingredientFound = inventory.find((stockItem) => stockItem.ingredient.name == stockIngredient.ingredient.name);

        if (ingredientFound) {
            const missingAmount = stockIngredient.amount - ingredientFound.amount

            if (missingAmount > 0) {
                missingIngredients.push([stockIngredient.ingredient.name, missingAmount, stockIngredient.ingredient.unit]);
            }
        } else {
            missingIngredients.push([stockIngredient.ingredient.name, stockIngredient.amount , stockIngredient.ingredient.unit]);
        }
    });

    return missingIngredients;
}

export default generateMissingIngredients