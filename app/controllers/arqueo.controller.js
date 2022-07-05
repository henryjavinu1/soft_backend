const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const e = require("express");
const User = db.user;
const Sesion = db.sesion;
const arqueo = db.arqueo;
const Op = db.Sequelize.Op;

exports.createArqueo = async(req, res) => {
    try{
        //consultar si el id del usuario y la sesion iniciada estan en la base de datos
        const consult = await db.user.findOne({
            where: {
                id: req.body.idUsuario,
                isDelete: false
            }
        });
        const consult2 = await db.sesion.findOne({
            where: {
                id: req.body.idSesion,
                isActive: true
            }
        });
        //si el id del usuario y la sesion iniciada estan en la base de datos
        if (consult) {
            if(consult2){
                 //insertar un nuevo arqueo
                const arqueo = await db.arqueo.create({   
                idUsuario: req.body.idUsuario,
                idSesion: req.body.idSesion,
                fechaInicio: new Date(),
                efectivoApertura: req.body.efectivoApertura,
                isDelete: false,
                });
                //validar que el arqueo se creo correctamente
                    if(arqueo){
                        res.status(200).json({
                        message: "Arqueo creado correctamente",
                         data: arqueo    
                        });
                    }
            }
        }
    }catch(error){
        res.status(401).json({
            message: "Error al crear arqueo" + error.message
        });
    }   
}

exports.actualizacionCerrandoSesion = async (req, res) => {
    try {
        //consultar si el id del usuario y la sesion iniciada estan en la base de datos
        const consult = await db.user.findOne({
            where: {
                id: req.body.idUsuario,
                isDelete: false
            }
        });
        const consult2 = await db.sesion.findOne({
            where: {
                id: req.body.idSesion,
                isActive: true,
                isDelete: false
            }
        });
        //si el id del usuario y la sesion iniciada estan en la base de datos
        if (consult) {
            if(consult2){
                //actualizar el arqueo
                const arqueo = await db.arqueo.update({
                    fechaFinal: new Date(),
                    efectivoCierre: req.body.efectivoCierre,
                    otrosPagos: req.body.otrosPagos,
                    ventaCredito: req.body.ventaCredito,
                    ventaTotal: req.body.ventaTotal,
                    efectivoTotal: req.body.efectivoTotal,
                }, {
                        where: {
                            id: req.body.idArqueo
                        }
                    });
                //validar que el arqueo se actualizo correctamente
                if(arqueo){
                    res.status(200).json({
                        message: "Arqueo actualizado correctamente",
                        data: 
                        await db.arqueo.findOne({
                            where: {
                                id: req.body.idArqueo
                            }
                        })
                    });
                }
                //actualizar la sesion
                const sesion = await db.sesion.update({
                    isActive: false
                }, {
                    where: {
                        id: req.body.idSesion
                    }
                });
            }
        } 
    } catch (error) {
        res.status(401).json({
            message: "Error al cerrar sesion" + error.message
        });
    }
}

exports.deleteArqueo = async (req, res) => {
    try {
        const arqueo = await db.arqueo.update({
            isDelete: true
        }, {
            where: {
                id: req.body.idArqueo
            }
        });
        //validar que el arqueo se elimino correctamente
        if(arqueo){
            res.status(200).json({
                message: "Arqueo eliminado correctamente"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Error al eliminar arqueo" + error.message
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
        //validar que el arqueo se mostro correctamente
        if(arqueos){
            res.status(200).json({
                message: "Arqueos mostrados correctamente",
                data: arqueos
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Error al mostrar arqueos" + error.message
        });
    }
}

exports.buscarPorFechaInicioFechaFinal = async (req, res) => {
    try {
        //mostrar los arqueos que esten entre las fechas de inicio y final
        const arqueos = await arqueo.findAll({
            where: {
                fechaInicio: {
                    [Op.between]: [`${fechaInicio}`, `${fechaFinal}`]
                },
                isDelete: false
            }
        });
        //validar que el arqueo se mostro correctamente
        if(arqueos){        
            res.status(200).json({
                message: "Arqueos mostrados correctamente",
                data: arqueos
            });
        } 
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al buscar arqueos entre las fechas" + error.message
        });
    }
}//pendiente de terminar

exports.buscarPorUsuario = async (req, res) => {
    try{
        //buscar arqueos por usuario
        const arqueos = await db.arqueo.findAll({
            where: {
                idUsuario: req.body.idUsuario,
                isDelete: false
            }
        });
        //validar que el arqueo se mostro correctamente
        if(arqueos){
            res.status(200).json({
                message: "Arqueos mostrados correctamente",
                data: arqueos
            });
        }
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al buscar arqueos por usuario" + error.message
        });
    }
}