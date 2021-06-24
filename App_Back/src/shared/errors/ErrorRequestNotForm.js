function createErrorRequestNotForm() {
    const err = new Error('Request must be type form-data')
    err.type = 'BAD_REQUEST'
    return err
}
  
export { createErrorRequestNotForm }