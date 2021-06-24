import { getMode } from "../../config.js";

let IngredientManager
let RecipeManager
let UserManager

switch (getMode()) {
    case 'PROD':
        const { crearMongoClient} = await import('./mongo/mongoClient.js')
        const { crearIngredientManagerMongo } = await import('./mongo/IngredientManagerMongo.js')
        const { crearRecipeManagerMongo } = await import('./mongo/RecipeManagerMongo.js')
        const { crearUserManagerMongo } = await import('./mongo/UserManagerMongo.js')
        const { getCnxStr } = await import('../../config.js')

        const cnxStr = getCnxStr()
        const mongoClient = crearMongoClient(cnxStr)
        const db = await mongoClient.connect()
        const IngredientManagerMongo = crearIngredientManagerMongo(db)
        IngredientManager = IngredientManagerMongo
        const RecipeManagerMongo = crearRecipeManagerMongo(db)
        RecipeManager = RecipeManagerMongo
        const UserManagerMongo = crearUserManagerMongo(db)
        UserManager = UserManagerMongo
        break;

    default:
        const { crearIngredientManager } = await import('./IngredientManager.js')
        const IngredientManagerCache = crearIngredientManager()
        IngredientManager = IngredientManagerCache
        const { crearRecipeManager } = await import('./RecipeManager.js')
        const RecipeManagerCache = crearRecipeManager()
        RecipeManager = RecipeManagerCache
        const { crearUserManager } = await import('./UserManager.js')
        const UserManagerCache = crearUserManager()
        UserManager = UserManagerCache
        break;
}

function getIngredientManager(){
    return IngredientManager
}

function getRecipeManager(){
    return RecipeManager
}

function getUserManager(){
    return UserManager
}

export default{
    getIngredientManager,
    getRecipeManager,
    getUserManager
}