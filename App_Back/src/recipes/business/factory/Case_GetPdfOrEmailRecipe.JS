import fs from 'fs'

class Case_GetPdfOrEmailRecipe {

    constructor(userService, recipeService, pdfMaker, mailGenerator) {
        this.userService = userService
        this.recipeService = recipeService
        this.pdfMaker = pdfMaker
        this.generadorDeMail = mailGenerator
    }
    
    async selectPdfOrEmailRecipe(idRecipe, idUser, sendFormat){

        const recipeToSend = []
       
        const user = this.userService.getById(idUser);
        const recipe = this.recipeService.getById(idRecipe)
        
        recipeToSend.push([recipe.title,""])
        recipe.stockIngredients.forEach(item => {
            recipeToSend.push([item.ingredient.name, item.amount])
        });

        if(sendFormat == "pdf"){
            this.pdfMaker.generate(arrReceta, 'receta.pdf')
        }else if(sendFormat == "email"){
            let body = "";
            body = recipe.title + `\n`;
            recipeToSend.forEach((item) => {
                if (item[1] != "") {
                    texto += `${item[0]}  cantidad: ${item[1]} \n`;
                }
            })
            
            //Ojo que este no esta usando promesas, esta usando Sync  - Gasti.
            fs.writeFileSync('./src/shared/mails/templates/PrintRecipeBody.html', body);
            
            await this.generadorDeMail.send(user.email)
        }
      }
    }

    export default Case_GetPdfOrEmailRecipe