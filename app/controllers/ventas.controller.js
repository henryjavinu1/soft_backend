const db = require("../models/puntoDeVentas");
//const db = require("../models/ventas");
const config = require("../config/auth.config");
const Ventas = db.ventas;
const DetalleVenta = db.detalleventa;
const Role = db.role;
const User = db.user;
const Op = db.sequelize.Op;

exports.crearVenta = async (req, res) => {
    try {
        const ventas = await Ventas.create({
            totalISV: req.body.totalISV,
            totalVenta: req.body.totalVenta,
            totalDescuentoVenta: req.body.totalDescuentoVenta,
            puntoDeEmision: req.body.puntoDeEmision,
            establecimiento: req.body.establecimiento,
            tipo: req.body.tipo,
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


//mostrar todas las ventas
exports.mostrarVentas = async (req = request, res = response) => {
    try {
        const todasLasVentas = await Ventas.findAll({
            where:{
                isDelete : false,
            },

        });
        if (!todasLasVentas) {
            return res.status(404).send({
                msg: "No hay ninguna venta creado"
            })
        }
        return res.status(200).json({todasLasVentas});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}