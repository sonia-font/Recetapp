function createErrorInvalidSendFormat() {
    const err = new Error('Available only: "email" or "pdf"')
    err.type = 'ERROR_INVALID_SEND_FORMAT'
    return err
}
  
export { createErrorInvalidSendFormat }