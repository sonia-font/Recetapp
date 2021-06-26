import FormData from 'form-data'
import fs from 'fs'

class MockForm {
    constructor(image){
        this.imageDir = image
    }

    async getForm() {
        let formData = new FormData();
        formData.append('title', 'Milanesas marineras')
        formData.append('image', fs.createReadStream(this.imageDir))
        formData.append('plates', 3)
        formData.append('time', 30)
        formData.append('difficulty', 'Facil')
        formData.append('characteristics', 'Coste medio, Receta sin sal, Frito')
        formData.append('ingredients', JSON.stringify([
            {
                name: 'Huevo',
                amount: 1,
                unit: 'unidad'
            },
            {
                name: 'Carne',
                amount: 3,
                unit: 'filetes'
            },
            {
                name: 'Harina 000',
                amount: 0.25,
                unit: 'taza'
            },
            {
                name:'Provenzal',
                amount: 1,
                unit: 'pizca'
            }
        ]))

        return formData
    }
}

export default MockForm