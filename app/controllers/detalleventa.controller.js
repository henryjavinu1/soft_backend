const db = require("../models/puntoDeVentas");
//const db = require("../models/detalleventa");
const config = require("../config/auth.config");
const { detalleventa, sequelize } = require("../models/puntoDeVentas");
const Ventas = db.ventas;
const DetalleVenta = db.detalleventa;
const Role = db.role;
const User = db.user;
const Prod = db.producto
const Op = db.sequelize.Op;

//crear detalle venta
exports.creardetalleventa = async (req, res) => {
    try {
        const detalleventa = await DetalleVenta.create({
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario,
            isvAplicado: req.body.isvAplicado,
            descuentoAplicado: req.body.descuentoAplicado,
            totalDetalleVenta: req.body.totalDetalleVenta,
            idVentas: req.body.idVentas,
            idProducto: req.body.idProducto,
        });
        const actulizarinventario = await sequelize.query(`
            UPDATE productos p INNER JOIN detalleventas dv 
                                ON p.id = dv.idProducto
            SET p.cantidadProducto = p.cantidadProducto - dv.cantidad
            WHERE p.id = ${req.body.idProducto}`);
        return res.status(200).send({
            message: "Detalle de Venta creado"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//mostrar todos los detalles
exports.mostrarDetalles = async (req = request, res = response) => {
    try {
        const todosLosDetalles = await DetalleVenta.findAll({
            where: {
                idVentas: req.body.idVenta,
                isDelete : false,
            }, include:[{
                model: db.producto,
                atributes: [ 'id','nombreProducto']
            }]

        });
        if (!todosLosDetalles) {
            return res.status(404).send({
                msg: "No hay ningun detalle de venta creado"
            })
        }
        return res.status(200).send({detalleDeVentaNueva: todosLosDetalles});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}


exports.actualizarDetalle = async (req = request, res = response) => {
    try {
        const detalleActualizar = await DetalleVenta.update({
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario,
            isvAplicado: req.body.isvAplicado,
            descuentoAplicado: req.body.descuentoAplicado,
            totalDetalleVenta: req.body.totalDetalleVenta,
            idVentas: req.body.idVentas,
            idProducto: req.body.idProducto,
        },{
            where: {
                id: req.body.id
            }
        });
        return res.status(200).send(detalleActualizar);
        } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Eliminar
exports.eliminarDetalle = async (req, res) => {
    try {
        const eliminarDetalle = await DetalleVenta.update({
            isDelete: true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (eliminarDetalle) {
            res.status(200).send({
                message: "Detalle eliminado correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error al eliminar el Detalle: " + error.message
        });
    }
}