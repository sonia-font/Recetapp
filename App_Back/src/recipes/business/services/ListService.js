async function listRecipes(recipes){
    const newRecipes = []
    while(newRecipes.length <= 14){
        let r = getRandomArbitrary(0,recipes.length)
        newRecipes.push(recipes[r])
    }
    return newRecipes
}

function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random() * (max - min)) + min;
}

export default listRecipes