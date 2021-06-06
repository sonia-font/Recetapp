let nextId = 1

class Ingredient {    

    constructor(data){
        this.name = data.name;
        this.amount = data.amount;
        this.unit = data.unit;
        this.id = nextId;

        nextId++        
    }
}

export default Ingredient
