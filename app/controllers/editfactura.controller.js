const { request, response } = require('express');
const  Op  = require("sequelize").Op;

const db = require('../models/puntoDeVentas');
const Factura = db.factura;
const Cliente = db.cliente;

const traerFacturas = async (req = request, res = response) => { 
    try {
        const facturas = await Factura.findAll();
        res.json({
            facturas
        })
    } catch (error) {
        console.error(error);
    }
}

const buscarfactura = async (req = request, res = response) => {
    const numeroFactura = req.query.numeroFactura;
    // const numReq = Object.keys(req.query).length

    console.log("me estoy ejecutando yo")
    const facturaBuscada = await Factura.findOne({
        where: { 
            numeroFactura: numeroFactura
            },
    });
    if (!facturaBuscada){
        return res.status(404).json({
            msg: "La factura que intenta buscar no existe"
        })
    }
    return res.status(200).json({
        facturaBuscada});
}

const buscarFacturaCliente = async (req, res) => {
    const {nombreCliente, rtn} = req.query;
    let clienteBuscado;
    console.log(nombreCliente);
    try {
        if (nombreCliente) {
            clienteBuscado = await Cliente.findOne({
                where: {
                    nombreCliente: nombreCliente
                }
            });
        } else if (rtn) {
            clienteBuscado = await Cliente.findOne({
                where: {
                    rtn: rtn
                }
            });
        } 
        if (!clienteBuscado) {
            return res.status(404).json({
                msg: `El cliente ingresado no existe`
            });
        }
        const facturasBuscadas = await Factura.findAll({
            where: {
                idCliente: clienteBuscado.id,
            }
        });
        if (facturasBuscadas.length === 0) {
            return res.status(404).json({
                msg: `El cliente: ${clienteBuscado.nombreCliente} no tiene facturas`
            })
        }
        res.status(200).json({
            facturasBuscadas
        });
    } catch (error) {
        console.log(error);
    }
}

const buscarFacturaFecha = async (req, res) => {
    const {fecha1, fecha2} = req.query;
    let facturaBuscada;
    // const numReq = Object.keys(req.query).length
    if (fecha1 && !fecha2) {
        console.log(fecha1);
        facturaBuscada = await Factura.findAll({
            where: { 
                fechaFactura: {
                    [Op.between]: [`${fecha1}`, `${fecha1}`]
                },
            }
        });   
    } else if (fecha1 && fecha2) {
        facturaBuscada = await Factura.findAll({
            where: { 
                fechaFactura: {
                    [Op.between]: [fecha1, fecha2]
                }
                },
        });  
    }
    if (facturaBuscada.length === 0) {
        return res.status(404).json({
            msg: (fecha1 && !fecha2)
                 ?`No hay facturas registradas en la fecha: ${fecha1}`
                 :`No hay facturas registradas entre las fechas: ${fecha1}, ${fecha2}`
        })
    }
    return res.status(200).json({facturaBuscada});
}

const buscarFacturaEmpleado = async (req = request, res = response) => {
    const idEmpleado = req.query.idEmpleado;
    try {
        const facturasBuscadas = await Factura.findAll({
            where: {
                idEmpleado: idEmpleado
            },
        })

        if (facturasBuscadas.length === 0) {
            return res.status(404).json({
                msg: `No hay facturas generadas por el empleado con id ${idEmpleado}`
            });
        }

        res.status(200).json({
            facturasBuscadas
        });
    } catch (error) {
        console.log(error);
    }
}

const editarFactura = async (req = request, res = response) => {
    const  numeroFactura  = req.params.id;
    const {fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado} = req.body;
    console.log(numeroFactura);
    try {
        const facturaBuscada = await Factura.findOne({
            where: { numeroFactura: numeroFactura },
        });

        if (!facturaBuscada) {
            return res.status(404).json({
                msg: "La factura ingresada no existe"
            })
        }

        validarCampos(facturaBuscada, numeroFactura, fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado)

        facturaBuscada.save();

        // facturaBuscada.update({
        //     cantidadLetras: "DOS CIENTOS OCHENTA Y CUATRO PUNTO VEINTI TRES"
        // })

        return res.status(200).json({
            message: "Factura actualizada con exito",
            factura: facturaBuscada,
        });
    } catch (error) {
        console.log(error);
    }
}

// const CONTROLADORPost = async (req = request, res = response) => {}
// const CONTROLADORPut = async (req = request, res = response) => {}

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

module.exports = {
    editarFactura,
    traerFacturas,
    buscarfactura,
    buscarFacturaCliente,
    buscarFacturaFecha,
    buscarFacturaEmpleado
}