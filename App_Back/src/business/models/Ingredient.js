class Ingredient {    

    static nextId = 1

    constructor(data){
        this.name = data.name;
        this.amount = data.amount; 
        // cantidad deberia definirlo el stock de la heladera y la cantidad para la receta.. el item stock tiene ingrediente y cantidad
        // clase recipe item - clase stock item ambas tienen un ingrediente y cantidad
        this.unit = data.unit;
        this.id = nextId;

        nextId++        
    }
}

export default Ingredient
