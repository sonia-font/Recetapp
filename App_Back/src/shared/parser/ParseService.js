import fs from 'fs'
import path from 'path'
import formidable from 'formidable'
import Recipe from '../../recipes/business/models/Recipe.js'
import Ingredient from '../../recipes/business/models/Ingredient.js'
import StockItem from '../../recipes/business/models/StockItem.js'

class ParseService {    

    async parseRecipe(req){
        var self = this
        return new Promise((resolve, reject) => {
            try {
                const form = new formidable.IncomingForm();
    
                form.parse(req, function(err, fields, files){
                    let recipe = self.getRecipe(fields, files)
                    resolve(recipe)
                })
            } catch (err) {
                reject(new Error('Error al subir la receta'))
            }
        })        
    }

    async getRecipe(fields, files){
        var self = this
        try{
            var oldPath = files.image.path;
            var newPath = path.join('./uploads')
                    + '/'+files.image.name
            var rawData = fs.readFileSync(oldPath)
            
            self.uploadImage(newPath, rawData)        
            
            return new Recipe({
                title: fields.title,
                image: newPath,
                plates: fields.plates,
                time: fields.time,
                difficulty: fields.difficulty,
                characteristics: fields.characteristics,
                stockIngredients: JSON.parse(fields.ingredients).map(item => ({name: item.name, amount: item.amount}))
            })
        } catch(error) {
            console.log(error)
            return {}
        }     
    }

    async uploadImage(newPath, rawData){
        fs.writeFile(newPath, rawData, function(err){
            if(err) {
                console.log(err)
            } else {
                console.log("Image Uploaded!")
            }
        })
    }
}

export default ParseService