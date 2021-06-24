async function listRecipes(recipes){
    const newRecipes = []
    const maxNumberRecipes = 14
    const minArbitraryNumber = 0
    while(newRecipes.length <= maxNumberRecipes){
        let r = getRandomArbitrary(minArbitraryNumber,recipes.length)
        newRecipes.push(recipes[r])
    }
    return newRecipes
}

function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random() * (max - min)) + min;
}

export default listRecipes