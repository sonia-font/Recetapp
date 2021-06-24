function createErrorInvalidRecipeId() {
    const err = new Error('Recipe id cannot be null of less than 0')
    err.type = 'ERROR_INVALID_ID'
    return err
}
  
export { createErrorInvalidRecipeId }