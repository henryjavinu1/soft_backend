const { request, response } = require('express');

const db = require('../models/manipularfactura');
const Factura = db.factura;

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
// CONTROLADORPut,
}