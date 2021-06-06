class Recipe {    

    static nextId = 1

    constructor(data){
        this.title = data.title;
        this.plates = data.plates;
        this.time = data.time;
        this.difficulty = data.difficulty;
        this.characteristics = data.characteristics;
        this.ingredients = data.ingredients;
        this.id = nextId;
        
        nextId++        
    }
}

export default Recipe