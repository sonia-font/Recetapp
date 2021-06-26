class IngredientManager {    

    constructor() {
        this.ingredients = [];
    }

    async add(ingredient) {
        this.ingredients.push(ingredient)
    }

    async getAll() {
        return this.ingredients
    }

    async getById(id) {
        return this.ingredients.find((ingredient) => ingredient.id == id)
    }

    async deleteById(id) {
        const indiceParaBorrar = this.ingredients.findIndex(i => i.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}              
        }else{
            this.ingredients.splice(indiceParaBorrar, 1)
            return {deleted: 1}  
        }
    }

    async updateById(ingredient) {
        const indiceParaReemplazar = this.ingredients.findIndex(i => i.id == ingredient.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            this.ingredients.splice(indiceParaReemplazar, 1, ingredient)
            return {updated: 1}
        }
    }

    async cerrar() {
        return console.log('cerrando manager de ingredientes en cache')
    }
}
  


export default IngredientManager