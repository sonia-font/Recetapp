function crearErrorClienteNoEncontrado() {
    const err = new Error('cliente no encontrado')
    err.type = 'ERROR_USER_NOT_FOUND'
    return err
}
  
export { crearErrorClienteNoEncontrado }