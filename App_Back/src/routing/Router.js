import ingredients from '../business/services/IngredientService.js'
import recipes from '../business/services/RecipeService.js'
import users from '../business/services/UserService.js'
import ingManager from '../persistance/dao/IngredientManager.js'
import recManager from '../persistance/dao/RecipeManager.js'
import usManager from '../persistance/dao/UserManager.js'

class Router {

    // Constructor takes:
    // - routePath which is the base path for each service exposed by the router subclass (ie. '/auth/users')
    // - app which is the Express application ref
    constructor(routePath,router) {          
        this.router = router;
        this.routePath = routePath;
        this.registerServices();
    }

    registerServices(){
        this.services = {
            ingredients: new ingredients(new ingManager()),
            recipes: new recipes(new recManager()),
            users: new users(new usManager())
        }
    }
}

export default Router