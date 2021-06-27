async function generateEmailBody(recipe){
    let body = ""
    let texto = ""
           
    recipe.stockIngredients.forEach(item => {      
        texto += `${item.ingredient.name}  cantidad: ${item.amount}${item.ingredient.unit} \n`;        
    })

    body = recipe.title + `\n` + texto;
    fs.writeFileSync('./src/shared/mails/templates/PrintRecipeBody.html', body);

    return body
}

export default generateEmailBody