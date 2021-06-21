let nextId = 0

class StockItem {    
    constructor(data){
        this.ingredient = data.ingredient
        this.amount = data.amount
        this.id = nextId++   
    }
}

export default StockItem