import axios from 'axios'

class AxiosClient {

    constructor(serverData){
        this.url = serverData
    }

    async uploadRecipe(formdata) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/test/upload', method: 'post', data: formdata, headers: formdata.getHeaders() })
    }

    async getRecipes() {
        var self = this
        return await self.sendRequest({ url: this.url + '/test/' })
    }

    async getBuyList(idRecipe, idUser) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/test/buylist', method: 'post', params: { idRecipe, idUser } })
    }

    async sendRecipe(idRecipe, idUser, format) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/test/start', method: 'post', params: { idRecipe, idUser, format } })
    }
    
    async getWeekPlan(idUser, keyWord, maxIngredients, maxTime, difficulty) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/test' + `/${idUser}` + '/weekPlan',method: 'post',  params: { keyWord,  maxIngredients, maxTime, difficulty } })
        
    }

    async sendRequest(req) {
        try {
            return await axios(req)
        } catch (error) {
            if (error.response) {
                const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
                NE.status = error.response.status
                NE.message = error.response.data.message
                throw NE
            } else {
                throw new Error('error al enviar la peticion')
            }
        }
    }
}

export default AxiosClient

