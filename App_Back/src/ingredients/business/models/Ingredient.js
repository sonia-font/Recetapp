let nextId = 0

class Ingredient {    
    constructor(data){
        this.name = data.name
        this.unit = data.unit
        this.id = nextId++   
    }
}

export default Ingredient