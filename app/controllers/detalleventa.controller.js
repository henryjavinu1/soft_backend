const db = require("../models/puntoDeVentas");
//const db = require("../models/detalleventa");
const config = require("../config/auth.config");
const Ventas = db.ventas;
const DetalleVenta = db.detalleventa;
const Role = db.role;
const User = db.user;
const Op = db.sequelize.Op;

exports.creardetalleventa = async (req, res) => {
    try{
        const detalleventa = await DetalleVenta.create({
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario, 
            isvAplicado: req.body.isvAplicado,
            descuentoAplicado: req.body.descuentoAplicado,
            totalDetalleVenta: req.body.totalDetalleVenta,
            idVentas: req.body.idVentas,
            idProducto: req.body.idProducto,
        })
        return res.status(200).send({
            message: "Detalle de Venta creado"
        });
        
        
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};