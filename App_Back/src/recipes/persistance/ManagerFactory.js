import { getMode } from "./config.js"
import IngredientManager from './memory/IngredientManager.js'
import RecipeManager from './memory/RecipeManager.js'
import UserManager from './memory/UserManager.js'

let _ingredientManager
let _recipeManager
let _userManager

switch (getMode()) {
    case 'PROD':
        const { crearMongoClient} = await import('./mongo/mongoClient.js')
        const { crearIngredientManagerMongo } = await import('./mongo/IngredientManagerMongo.js')
        const { crearRecipeManagerMongo } = await import('./mongo/RecipeManagerMongo.js')
        const { crearUserManagerMongo } = await import('./mongo/UserManagerMongo.js')
        const { getCnxStr } = await import('./config.js')
        const { getDBname } = await import('./config.js')

        const cnxStr = getCnxStr()
        const dbName = getDBname()
        const mongoClient = crearMongoClient(cnxStr,dbName)
        const db = await mongoClient.connect()
        const IngredientManagerMongo = crearIngredientManagerMongo(db)
        _ingredientManager = IngredientManagerMongo
        const RecipeManagerMongo = crearRecipeManagerMongo(db)
        _recipeManager = RecipeManagerMongo
        const UserManagerMongo = crearUserManagerMongo(db)
        _userManager = UserManagerMongo
        break;

    default:
        const IngredientManagerCache = new IngredientManager()
        _ingredientManager = IngredientManagerCache
        const RecipeManagerCache = new RecipeManager()
        _recipeManager = RecipeManagerCache
        const UserManagerCache = new UserManager()
        _userManager = UserManagerCache
        break;
}

function getIngredientManager(){
    return _ingredientManager
}

function getRecipeManager(){
    return _recipeManager
}

function getUserManager(){
    return _userManager
}

export default{
    getIngredientManager,
    getRecipeManager,
    getUserManager
}