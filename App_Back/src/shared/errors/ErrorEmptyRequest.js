function createErrorEmptyRequest() {
    const err = new Error('Empty request to parse')
    err.type = 'BAD_REQUEST'
    return err
}
  
export { createErrorEmptyRequest }