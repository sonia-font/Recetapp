function createErrorInvalidUserId() {
    const err = new Error('User id cannot be null of less than 0')
    err.type = 'ERROR_INVALID_ID'
    return err
}
  
export { createErrorInvalidUserId }