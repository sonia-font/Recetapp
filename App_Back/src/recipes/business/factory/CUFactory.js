//Casos de uso
import Case_UploadRecipe from './Case_UploadRecipe.js'
import Case_GetRecipes from './Case_GetRecipes.js'
import Case_GetBuyList from './Case_GetBuyList.js'
import Case_GetPdfOrEmailRecipe from './Case_GetPdfOrEmailRecipe.js'
import Case_GetWeekPlan from './Case_GetWeekPlan.js'

//DAOS
import RecipeManager from '../../persistance/RecipeManager.js'
import UserManager from '../../persistance/UserManager.js'

//Servicios
import RecipeService from '../services/RecipeService.js'
import UserService from '../services/UserService.js'
import ParseService from '../../../shared/parser/ParseService.js'
import PdfMaker from '../../../shared/pdfmaker/PdfMaker.js'
import {crearMailer} from "../../../shared/mails/Factory_Mailer.js"
import configMailer from "../../../shared/mails/config.js"

class CUFactory {

    constructor() {
        //daos
        this.recipeManager = new RecipeManager()
        this.userManager = new UserManager()

        //servicios
        this.recipeService = new RecipeService(this.recipeManager)     
        this.userService = new UserService(this.userManager)   
        this.parseService = new ParseService()
        this.pdfMaker = new PdfMaker("buylist.pdf")     

    }

    async createCase_UploadRecipe() {
        const case_UploadRecipe = new Case_UploadRecipe(
            this.parseService,
            this.recipeService
        )    
        
        return case_UploadRecipe
    }
    
    async createCase_GetRecipes() {
        const case_GetRecipes = new Case_GetRecipes(
            this.recipeService
        )    
        
        return case_GetRecipes
    }

    async createCase_GetBuyList() {
        const case_GetBuyList = new Case_GetBuyList(
            this.recipeService, 
            this.userService, 
            this.pdfMaker
        )
        
        return case_GetBuyList
    }

    async createCase_GetPdfOrEmailRecipe(){
        const case_GetPdfOrEmailRecipe = new Case_GetPdfOrEmailRecipe(
            this.userService,
            this.recipeService, 
            this.pdfMaker,
            this.mailer = crearMailer(configMailer.configPrintRecipe)
        )
        
        return case_GetPdfOrEmailRecipe
    }

    async createCase_GetWeekPlan(){
        const CU_GetWeekPlan = new Case_GetWeekPlan(
            this.userService,
            this.recipeService,
            this.mailer = crearMailer(configMailer.configWeeklyPlan)  
        )

        return CU_GetWeekPlan
    }
}

export default CUFactory