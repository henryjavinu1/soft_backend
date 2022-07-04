const filtrarFacturas = async (Factura, parametroBuscado = Factura, valorBuscado, Empleado, TipoPago, Talonario, Cliente) => {
    atributo = parametroBuscado;
    const facturasBuscadas = await Factura.findAll({
        where: {
            [Op.and]: [{ idCliente: clienteBuscado.id }, { isDelete: false }]
        },
        include: [
            {
                model: Empleado,
                attributes: ['id', 'nombre', 'apellido'],
            },
            {
                model: TipoPago,
                attributes: ['idTipoPago', 'tipoDePago']
            },
            {
                model: Talonario,
                attributes: ['idTalonario', 'cai']
            },
            {
                model: Cliente,
                attributes: ['id', 'nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
            }
        ]
    });
    return facturasBuscadas;
}

const impresionDeFacturas = (facturasBuscadas) => {
    const facturas = facturasBuscadas.map((factura) => {
        const noExisteEmpleado = "No existe empleado."
        let existeEmpleado = true;
        let existeTalonario = true;
        let existeCliente = true;
        let existeDni = true;
        let existeRtn = true;
        let existeDireccion = true;
        let existeTelefonoCliente = true;
        if (!factura.empleado) {
            // factura.empleado.id = 0;
            existeEmpleado = false;
        }
        if (!factura.talonario) {
            existeTalonario = false;
        }
        if (!factura.cliente) {
            existeCliente = false;
            existeDni = false;
            existeRtn = false;
            existeDireccion = false;
            existeTelefonoCliente = false;
        } else {
            if (!factura.cliente.dni) {
                existeDni = false;
            }
            if (!factura.cliente.rtn) {
                existeRtn = false;
            }
            if (!factura.cliente.direccion) {
                existeDireccion = false;
            }
            if (!factura.cliente.telefonoCliente) {
                existeTelefonoCliente = false;
            }
        }
        return {
            idFactura: factura.idFactura,
            numeroFactura: factura.numeroFactura,
            fechaFactura: factura.fechaFactura,
            descuentoTotalFactura: factura.descuentoTotalFactura,
            isvTotalFactura: factura.isvTotalFactura,
            totalFactura: factura.totalFactura,
            subTotalFactura: factura.subTotalFactura,
            cantidadLetras: factura.cantidadLetras,
            idEmpleado: (!existeEmpleado) ? 0 : factura.empleado.id,
            nombreEmpleado: (!existeEmpleado) ? noExisteEmpleado : factura.empleado.nombre.trim() + " " + factura.empleado.apellido.trim(),
            tipoPago: factura.tipopago.tipoDePago,
            cai: (!existeTalonario) ? "No existe un talonario asociado a este CAI por favor comuniquese con el administrador." : factura.talonario.cai,
            nombreCliente: (!existeCliente) ? "No existe cliente" : factura.cliente.nombreCliente,
            dniCliente: (!existeDni) ? "" : factura.cliente.dniCliente,
            rtn: (!existeRtn) ? "" : factura.cliente.rtn,
            direccionCliente: (!existeDireccion) ? "" : factura.cliente.direccion,
            telefonoCliente: (!existeTelefonoCliente) ? "" : factura.cliente.telefonoCliente,
        }
    });
    return facturas;
}

const validarCampos = (factura, numeroFactura, fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado) => {
    if (numeroFactura) {
        factura.numeroFactura = numeroFactura;
    }

    if (fechaFactura) {
        factura.fechaFactura = fechaFactura;
    }

    if (descuentoTotalFactura) {
        factura.descuentoTotalFactura = descuentoTotalFactura;
    }

    if (isvTotalFactura) {
        factura.isvTotalFactura = isvTotalFactura;
    }

    if (totalFactura) {
        factura.totalFactura = totalFactura;
    }

    if (subTotalFactura) {
        factura.subTotalFactura = subTotalFactura;
    }

    if (cantidadLetras) {
        factura.cantidadLetras = cantidadLetras;
    }

    if (isDelete) {
        factura.isDelete = isDelete;
    }

    if (estado) {
        factura.estado = estado;
    }

    return factura;
}

const filtrarFacturasPorFechaQuery = async (Op, Factura, fecha1, fecha2, Empleado, TipoPago, Talonario, Cliente) => {
    const facturaBuscada = await Factura.findAll({
        where: {
            [Op.and]: [
                { isDelete: false },
                {
                    fechaFactura: {
                        [Op.between]: [fecha1, fecha2]
                    }
                }]
        },
        include: [
            {
                model: Empleado,
                attributes: ['id', 'nombre', 'apellido'],
            },
            {
                model: TipoPago,
                attributes: ['tipoDePago']
            },
            {
                model: Talonario,
                attributes: ['cai']
            },
            {
                model: Cliente,
                attributes: ['nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
            }
        ]
    });
    return facturaBuscada;
}

module.exports = {
    impresionDeFacturas,
    validarCampos,
    filtrarFacturasPorFechaQuery
    // filtrarFacturas,
}