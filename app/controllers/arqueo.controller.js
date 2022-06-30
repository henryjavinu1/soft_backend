const db = require("../models/arqueo");
const config = require("../config/auth.config");
const e = require("express");
const User = db.user;
const Sesion = db.sesion;
const arqueo = db.arqueo;
const Op = db.Sequelize.Op;

//crear un procedimiento almacenado que al iniciar sesion cree un arqueo y lo guarde en la base de datos
//y validar el rol que tiene el usuario para saber si tiene permiso para crear un arqueo
exports.actualizacionCerrandoSesion = async (req, res) => {
    try {
        //obtener datos de usuario y permisos de la sesion iniciada
        const user = await User.findByPk(req.user.id);
        const sesion = await Sesion.findByPk(req.user.id);
        //actualizar datos del arqueo
        const arqueo = await arqueo.update({
            fechaFin: new Date(),
            efectivoCierre: req.body.efectivoCierre,
            otrosPagos: req.body.otrosPagos,
            ventaCredito: req.body.ventaCredito,
            ventaTotal: req.body.ventaTotal,
            idUsuario: req.user.id,
            idSesion: sesion.id,
            isDelete: false
        });
        //guardar arqueo en la base de datos
        await arqueo.save();
        //enviar respuesta al cliente
        res.status(200).json({
            message: "Arqueo actualizado correctamente"
        });
        res.status(401).json({
            message: "No tiene permisos para crear un arqueo"
        });
        //actualizar el estado de la sesion actualmente activa
        await Sesion.update({
            isActive: false
        });
    } catch (error) {
        //enviar respuesta al cliente
        res.status(500).json({
            message: "Error al actualizar arqueo"
        });
    }
} 
//crear un procedimiento almacenado que permita cambiar el estado isDelete de un arqueo 
exports.deleteArqueo = async (req, res) => {
    try {
        //verificar si el usuario que ejecutara la accion tenga los permisos necesarios
        const user = await User.findByPk(req.user.id);
        const sesion = await Sesion.findByPk(req.user.id);
        if (user.rol === "admin") {
            //eliminar arqueo
            //usando llave primaria de arqueo
            const arqueo = await arqueo.update({
                isDelete: true,
                    where: {
                        id: req.params.id
                    }
            });
            //enviar respuesta al cliente
            res.status(200).json({
                message: "Arqueo eliminado correctamente"
            });
        }
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al eliminar arqueo"
        });
    }
}
//crear un procedimiento almacenado que permita mostrar todos los arqueos que su isDelete sea false
exports.mostrarArqueo = async (req, res) => {
    try {
        //verificar si el usuario que ejecutara la accion tenga los permisos necesarios
        const user = await User.findByPk(req.user.id);
        const sesion = await Sesion.findByPk(req.user.id);
        if (user.rol === "admin") {
            //mostrar arqueos
            const arqueos = await arqueo.findAll({
                where: {
                    isDelete: false
                }
            });
            //enviar respuesta al cliente
            res.status(200).json({
                message: "Arqueos mostrados correctamente",
                data: arqueos
            });
        }
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al mostrar arqueos"
        });
    }
}
//crear un procedimiento almacenado que permita buscar un arqueo por su idUsuario o por fecha de inicio
exports.buscarPorUsuarioYFecha = async (req, res) => {
    try {
        //validar que el usuario tenga los permisos para buscar los arqueos
        const user = await User.findByPk(req.user.id);
        const sesion = await Sesion.findByPk(req.user.id);
        if (user.rol === "admin") {
            //buscar arqueos por usuario o fecha
            const arqueos = await arqueo.findAll({
                where: {
                    [Op.or]: [{
                        idUsuario: req.params.idUsuario
                    }, {
                        fechaInicio: req.params.fechaInicio
                    }]
                }          
            })
        }
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al buscar arqueos"
        });
    }
}