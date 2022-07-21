const { query } = require("express");
const { factura, sequelize } = require("../models/puntoDeVentas");
const db = require("../models/puntoDeVentas");
const { impresionArqueo } = require('../helpers/arqueo.helper');
const Arque = db.arqueo;
const Sesi = db.sesion;
const User = db.user;
const Op = db.Sequelize.Op;


exports.createArqueo = async(req, res) => {
    try{
        //consultar si el id del usuario y la sesion iniciada estan en la base de datos
        const consult = await User.findOne({
            where: {
                id: req.body.idUsuario,
                isDelete: false
            }
        });
        const consult2 = await Sesi.findOne({
            where: {
                id: req.body.idSesion,
                isActive: true
            }
        });
        //si el id del usuario y la sesion iniciada estan en la base de datos
        if (consult) {
            if(consult2){
                 //insertar un nuevo arqueo
                const arqueo = await Arque.create({   
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
        const consult = await User.findOne({
            where: {
                id: req.body.idUsuario,
                isDelete: false
            }
        });
        const consult2 = await Sesi.findOne({
            where: {
                id: req.body.idSesion,
                isActive: true,
                isDelete: false
            }
        });
        const consult3 = await Arque.findOne({
            where: {
                idArqueo: req.body.idArqueo,
                isDelete: false
            }
        });
        //si el id del usuario y la sesion iniciada estan en la base de datos
        if (consult) {
            if(consult2){
                if(consult3){
                    //actualizar el arqueo
                    const arqueo1 = await sequelize.query(`UPDATE arqueos SET    efectivoCierre = (SELECT SUM(totalFactura) 
                                                                                                  FROM facturas 
                                                                                                  WHERE idTipoPago = 1 AND idSesion = ${req.body.idSesion}),
                                                                                otrosPagos = (SELECT SUM(totalFactura)
                                                                                              FROM facturas
                                                                                              WHERE idTipoPago = 2 AND idSesion = ${req.body.idSesion}),
                                                                                ventaCredito = (SELECT SUM(totalFactura)
                                                                                                FROM facturas
                                                                                                WHERE idTipoPago = 3 AND idSesion = ${req.body.idSesion})
                                                        WHERE idArqueo = ${req.body.idArqueo}`);
                    const arqueo2 = await sequelize.query(`UPDATE arqueos SET efectivoTotal = (SELECT SUM(efectivoApertura + efectivoCierre)
                                                                                                FROM arqueos
                                                                                                WHERE arqueos.idArqueo = ${req.body.idArqueo}),
                                                                                ventaTotal = (SELECT SUM(efectivoCierre + otrosPagos + ventaCredito)
                                                                                              FROM arqueos
                                                                                              WHERE idSesion = ${req.body.idSesion})
                                                            WHERE arqueos.idArqueo = ${req.body.idArqueo}`);
                                                                                                

                    const fe = await Arque.update({
                      fechaFinal: new Date(),
                    },{
                      where: {
                        idArqueo: req.body.idArqueo,
                      },
                    });
                   const se = await Sesi.update({
                        isActive: false,
                    },{
                        where: {
                            id: req.body.idSesion,
                        },
                  });
                  const arqueos = await Arque.findOne({
                    where: {
                        idArqueo: req.body.idArqueo,
                        isDelete: false
                    }
                  });
                    //validar que el arqueo se actualizo correctamente
                    if (arqueo1 && arqueo2 && fe && se) {
                       return res.status(200).send({
                            message: "Arqueo actualizado correctamente",
                            arqueos
                    });   
                  }
                }
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Error al cerrar sesion " + error.message
        });
    }
}

exports.deleteArqueo = async (req, res) => {
    try {
        const arqueo = await Arque.update({
            isDelete: true
        }, {
            where: {
                idArqueo: req.body.idArqueo
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
        //mostrar arqueo que su isDelete sea false
        const arqueos = await Arque.findAll({
            where: {
                isDelete: false,
            }
        });
        if(!arqueos){
            res.status(404).send({
                message: "No hay arqueos"
            });
        }
        return res.status(200).send({arqueos});
    } catch (error) {
        res.status(500).send({
            message: "Error al mostrar arqueo" + error
        });
    }
}

exports.buscarPorFechaInicioFechaFinal = async (req, res) => {
    try {
        //mostrar los arqueo que esten entre las fechas de inicio y final
        const arqueo = await Arque.findAll({
            where: {
                fechaInicio: {
                    [Op.between]: [`${fechaInicio}`, `${fechaFinal}`]
                },
                isDelete: false
            }
        });
        //validar que el arqueo se mostro correctamente
        if(arqueo){        
            res.status(200).json({
                message: "arqueo mostrados correctamente",
                data: arqueo
            });
        } 
    } catch (error) {
        //enviar respuesta al cliente
        res.status(401).json({
            message: "Error al buscar arqueo entre las fechas" + error.message
        });
    }
}//pendiente de terminar

exports.buscarPorUsuario = async (req, res) => {
    try{
        //buscar arqueo por usuario
        const use = await Arque.findAll({
            where: {
                idUsuario: req.body.idUsuario,
                isDelete: false
            }
        });
        //validar que el arqueo se mostro correctamente
        if(!use){
            res.status(404).send({
                message: "No se encontro ningun arqueo"
            });
        } 
        return res.status(200).send({use});
    } catch (error) {
        //enviar respuesta al cliente
        return res.status(500).json({
            message: "Error al buscar arqueo por usuario" + error.message
        });
    }
}
