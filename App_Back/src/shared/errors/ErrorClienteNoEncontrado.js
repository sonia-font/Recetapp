function crearErrorClienteNoEncontrado() {
    const err = new Error('cliente no encontrado')
    err.type = 'ERR_CLI_NOT_FOUND'
    return err
  }
  
  export { crearErrorClienteNoEncontrado }