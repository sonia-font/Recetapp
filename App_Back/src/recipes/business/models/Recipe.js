let nextId = 0

class Recipe {    
    constructor(data){
        this.title = data.title
        this.image = data.image
        this.plates = data.plates
        this.time = data.time
        this.difficulty = data.difficulty
        this.characteristics = data.characteristics
        this.stockIngredients = data.stockIngredients
        this.id = nextId++   
    }
}

export default Recipe