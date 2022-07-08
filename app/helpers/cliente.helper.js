const validarCamposCliente = (cliente, dni, email, rtn, nombreCliente, direccion, telefonoCliente, isDelete) => {
    if (dni) {
        cliente.dni = dni;
    }

    if (email) {
        cliente.email = email;
    }

    if (rtn) {
        cliente.rtn = rtn;
    }

    if (nombreCliente) {
        cliente.nombreCliente = nombreCliente;
    }

    if (direccion) {
        cliente.direccion = direccion;
    }

    if (telefonoCliente) {
        cliente.telefonoCliente = telefonoCliente;
    }

    if (isDelete) {
        cliente.isDelete = isDelete;
    }

    return cliente;
}
module.exports = {
  validarCamposCliente,
}