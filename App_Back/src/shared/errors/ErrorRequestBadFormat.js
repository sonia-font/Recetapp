function createErrorRequestBadFormat() {
    const err = new Error('Request must be a class')
    err.type = 'BAD_REQUEST'
    return err
}
  
export { createErrorRequestBadFormat }