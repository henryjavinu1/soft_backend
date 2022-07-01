const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const e = require("express");
const User = db.user;
const Sesion = db.sesion;
const arqueo = db.arqueo;
const Op = db.Sequelize.Op;

exports.createArqueo = async(req, res) => {
    try{
        const sesion = await Sesion.findByPk(req.user.id);
        const user = await User.findByPk(req.user.id);
        //crear un arqueo
        const arqueo = await arqueo.create({
            fechaInicio: new Date(),
            efectivoInicio: req.body.efectivoInicio,
            isDelete: false,
            idSesion: sesion.id,
            idUsuario: req.user.id            
        });
        const resp ={
            id: arqueo.id,
            fechaInicio: arqueo.fechaInicio,
            efectivoInicio: arqueo.efectivoInicio,
            isDelete: arqueo.isDelete,
            idSesion: arqueo.idSesion,
            idUsuario: arqueo.idUsuario
        }
        return res.status(200).send(resp);
    } catch (error) {
        res.status(401).send({
            message: "Error al crear el arqueo"
        });
    }
}

exports.actualizacionCerrandoSesion = async (req, res) => {
    try {
        //obtener datos de usuario y permisos de la sesion iniciada
        const user = await User.findByPk(req.user.id);
        const sesion = await Sesion.findByPk(req.user.id);
        //hacer un inner join con tabla user y tabla factura
        const arqueos = await arqueo.findAll({
            where: {
                idUsuario: req.user.id,
            },
            include: [{
                model: db.user,
                include: [{
                    model: db.factura,
                }]
            }]
        });
        //actualizar el arqueo
        const arqueo = await arqueo.update({
            fechaFinal: new Date(),
            //sumar todas las facturas que su tipo de pago sea efectivo y que sean de la sesion iniciada
            efectivoCierre: arqueos.reduce((total, arqueo) => {
                if (arqueo.facturas.tipoPago === "Efectivo") {
                    return total + arqueo.facturas.totalFactura;
                } else {
                    return total;
                }
            }, 0),
            //sumar todas las facturas que su tipo de pago sea tarjeta y que sean de la sesion iniciada
            otrosPagos: arqueos.reduce((total, arqueo) => {
                if (arqueo.facturas.tipoPago === "Tarjeta") {
                    return total + arqueo.facturas.totalFactura;
                } else {
                    return total;
                }
            }, 0),
            //sumar todas las facturas que su tipo de pago sea credito y que sean de la sesion iniciada
            ventaCredito: arqueos.reduce((total, arqueo) => {
                if (arqueo.facturas.tipoPago === "Credito") {
                    return total + arqueo.facturas.totalFactura;
                } else {
                    return total;
                }
            }, 0),
            //sumar las facturas que su tipo de pago sea Efectivo, Tarjeta
            ventaTotal: arqueos.reduce((total, arqueo) => {
                if (arqueo.facturas.tipoPago === "Efectivo" || arqueo.facturas.tipoPago === "Tarjeta" || arqueo.facturas.tipoPago === "Credito") {
                    return total + arqueo.facturas.totalFactura + arqueo.efectivoInicio + arqueo.efectivoCierre;
                } else {
                    return total;
                }
            }, 0),
            //sumar las facturas que su tipo de pago sea Efectivo
            efectivoTotal: arqueos.reduce((total, arqueo) => {
                if (arqueo.facturas.tipoPago === "Efectivo") {
                    return total + arqueo.facturas.totalFactura + arqueo.efectivoInicio + arqueo.efectivoCierre;
                } else {
                    return total;
                }
            }, 0),
            isDelete: false,
        });
        //enviar respuesta al cliente
        res.status(200).json({
            message: "Sesion cerrada correctamente",
            arqueo: arqueo
        });
        //actualizar el estado de la sesion
        await sesion.update({
            isActive: false
        });
    } catch (error) {
        res.status(401).json({
            message: "Error al cerrar sesion"
        });
    }
}

exports.deleteArqueo = async (req, res) => {
    try {
        const arqueo = await arqueo.update({
            isDelete: true
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Arqueo eliminado correctamente"
        });
    } catch (error) {
        res.status(401).json({
            message: "Error al eliminar arqueo"
        });
    }
}

exports.mostrarArqueo = async (req, res) => {
    try {
        //mostrar arqueos que su isDelete sea false
        const arqueos = await arqueo.findAll({
            where: {
                isDelete: false
            }
        });
        res.status(200).json({
            message: "Arqueos mostrados correctamente",
            arqueos: arqueos
        });
    } catch (error) {
        res.status(401).json({
            message: "Error al mostrar arqueos"
        });
    }
}

exports.buscarPorUsuarioYFecha = async (req, res) => {
    try {
        //obtener datos de usuario
        const user = await User.findByPk(req.user.id);
        //buscar arqueos por fecha de inicio que su isdelete sea false o por usuario que su isdelete sea false
        const arqueos = await arqueo.findAll({
            where: {
                fechaInicio: req.params.fecha,
                idUsuario: user,
                isDelete: false
            }
        });
        res.status(200).json({
            message: "Arqueos mostrados correctamente",
            arqueos: arqueos
        });
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al buscar arqueos"
        });
    }
}