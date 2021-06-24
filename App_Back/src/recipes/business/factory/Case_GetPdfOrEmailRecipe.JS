import fs from 'fs'
import {createErrorInvalidRecipeId} from '../../../shared/errors/ErrorInvalidRecipeId.js'
import {createErrorInvalidUserId} from '../../../shared/errors/ErrorInvalidUserId.js'
import {createErrorInvalidSendFormat} from '../../../shared/errors/ErrorInvalidSendFormat.js'

class Case_GetPdfOrEmailRecipe {

    constructor(userService, recipeService, pdfMaker, mailGenerator) {
        this.userService = userService
        this.recipeService = recipeService
        this.pdfMaker = pdfMaker
        this.generadorDeMail = mailGenerator
    }
    
    async selectPdfOrEmailRecipe(idRecipe, idUser, sendFormat){
        if (idRecipe == null || idRecipe < 0) {
            throw createErrorInvalidRecipeId()
        } 
        if (idUser == null || idUser < 0) {
            throw createErrorInvalidUserId()
        }
        if (sendFormat != "pdf" && sendFormat != "email") {
            throw createErrorInvalidSendFormat()
        }

        const recipeToSend = []
       
        const user = await this.userService.getById(idUser);
        const recipe = await this.recipeService.getById(idRecipe)
        
        recipeToSend.push([recipe.title,""])
        recipe.stockIngredients.forEach(item => {
            recipeToSend.push([item.ingredient.name, item.amount])
        });
        if(sendFormat == "pdf"){
            this.pdfMaker.generate(recipeToSend, 'receta.pdf')
        }else if(sendFormat == "email"){
            let body = "";
            let texto = "";
           
            recipeToSend.forEach((item) => {
                if (item[1] != "") {
                    texto += `${item[0]}  cantidad: ${item[1]} \n`;
                }
            })
            body = recipe.title + `\n` + texto;
            fs.writeFileSync('./src/shared/mails/templates/PrintRecipeBody.html', body);
            
            await this.generadorDeMail.send(user.email)
        }
      }
    }

    export default Case_GetPdfOrEmailRecipe