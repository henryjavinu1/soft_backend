const validarCamposEmpleado = (empleado, idEmpleado, nombre, apellido, direccion, telefono, fechaNacimiento, sexo, isDelete) => {
    if (idEmpleado) {
        empleado.idEmpleado = idEmpleado;
    }

    if (nombre) {
        empleado.nombre = nombre;
    }

    if (apellido) {
        empleado.apellido = rtn;
    }

    if (direccion) {
        empleado.direccion = direccion;
    }


    if (telefono) {
        empleado.telefono = telefono;
    }

    if (fechaNacimiento) {
        empleado.fechaNacimiento = fechaNacimiento;
    }

    if (sexo) {
        empleado.sexo = sexo;
    }

    if (isDelete) {
        empleado.isDelete = isDelete;
    }

    return empleado;
}
module.exports = {
    validarCamposEmpleado,
}