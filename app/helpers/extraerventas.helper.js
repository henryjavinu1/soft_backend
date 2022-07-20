const impresionDeVentas = (ventaBuscado) => {
    const ventas = ventaBuscado.map((ventas) => {
    
        let existeUsuario = true;
        let existeEmpleado = true;
        let existenombre = true;
        let existeidEmpleado = true;
        let existeCliente = true;
        let existeDni = true;
        let existeRtn = true;
        let existeDireccion = true;
        let existeTelefonoCliente = true;
        
        if (!ventas.usuario) { 
            existeUsuario = false;

        }else{
            existeUsuario = true;
          
        }
        if (!ventas.usuario.empleado) { 
            existenombre = false;
            existeidEmpleado = false;

        }else{
            existenombre = true;
            existeidEmpleado = true;
        }
        if (!ventas.cliente) {
            existeCliente = false;
            existeDni = false;
            existeRtn = false;
            existeDireccion = false;
            existeTelefonoCliente = false;
        } else {
            if (!ventas.cliente.dni) {
                existeDni = false;
            }
            if (!ventas.cliente.rtn) {
                existeRtn = false;
            }
            if (!ventas.cliente.direccion) {
                existeDireccion = false;
            }
            if (!ventas.cliente.telefonoCliente) {
                existeTelefonoCliente = false;
            }
        } 
        return {
            id: ventas.id,
            totalISV: ventas.totalISV,
            totalVenta: ventas.totalVenta,
            totalDescuentoVenta: ventas.totalDescuentoVenta,
            puntoDeEmision: ventas.puntoDeEmision,
            establecimiento: ventas.establecimiento,
            tipo: ventas.tipo,
            idSesion: ventas.idSesion,
            idUsuario: ventas.idUsuario,
            idCliente: ventas.idCliente,
            nombreCliente: (!existeCliente) ? "No existe cliente" : ventas.cliente.nombreCliente,
            dni: (!existeDni) ? "" : ventas.cliente.dni,
            rtn: (!existeRtn) ? "" : ventas.cliente.rtn,
            direccionCliente: (!existeDireccion) ? "" : ventas.cliente.direccion,
            telefonoCliente: (!existeTelefonoCliente) ? "" : ventas.cliente.telefonoCliente,
            idEmpleado: (!existeEmpleado) ? 0 : ventas.usuario.empleado.id,
            nombreEmpleado: (!existeEmpleado) ? "" : ventas.usuario.empleado.nombre,
            usuario: (!existeUsuario) ? "" : ventas.usuario.usuario,
           
        };
    });
        return ventas;
    } 



module.exports = {
    impresionDeVentas,
}