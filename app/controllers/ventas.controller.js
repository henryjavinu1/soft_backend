const db = require("../models/puntoDeVentas");
//const db = require("../models/ventas");
const config = require("../config/auth.config");
const Ventas = db.ventas;
const DetalleVenta = db.detalle_venta;
const Role = db.role;
const User = db.user;
const Op = db.sequelize.Op;

exports.crearVenta = async (req, res) => {
    try{
        const ventas = await Ventas.create({
            totalISV: req.body.totalISV,
            totalVenta: req.body.totalVenta, 
            totalDescuentoVenta: req.body.totalDescuentoVenta,
            idSesion: req.body.idSesion,
            idUsuario: req.body.idUsuario,
            idCliente: req.body.idCliente,
        });
        return res.status(200).send({
            message: "Venta creada"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};