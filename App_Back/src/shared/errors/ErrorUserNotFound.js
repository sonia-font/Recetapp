function createErrorUserNotFound() {
    const err = new Error('User not Found')
    err.type = 'ERROR_USER_NOT_FOUND'
    return err
}
  
export { createErrorUserNotFound }