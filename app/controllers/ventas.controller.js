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
            id: ventas.id
        });
    } catch (error) {
        console.log(error);
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

// Actualizar 
exports.actualizarVenta = async (req = request, res = response) => {

    try {
        const ventaActualizar = await Ventas.update({
            totalISV: req.body.totalISV,
            totalVenta: req.body.totalVenta,
            totalDescuentoVenta: req.body.totalDescuentoVenta,
            puntoDeEmision: req.body.puntoDeEmision,
            establecimiento: req.body.establecimiento,
            tipo: req.body.tipo,
            idSesion: req.body.idSesion,
            idUsuario: req.body.idUsuario,
            idCliente: req.body.idCliente,
        },{
            where: {
                id: req.body.id
            }
        });
        return res.status(200).send(ventaActualizar);
        } catch (error) {
        
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Eliminar modifica un isActive para poder procesar una factura de venta
exports.eliminarVentaProcesar = async (req, res) => {
    try {
        const procesarVenta = await Ventas.update({
            isActive: true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (procesarVenta) {
            res.status(200).send({
                message: "Venta procesada"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error en la venta: " + error.message
        });
    }
}
//Eliminar is delete
exports.eliminarVenta = async (req, res) => {
    try {
        const eliminarVenta = await Ventas.update({
            isDelete: true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (eliminarVenta) {
            res.status(200).send({
                message: "Venta eliminada correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error al eliminar la venta: " + error.message
        });
    }
}