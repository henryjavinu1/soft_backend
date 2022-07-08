const db = require("../models/puntoDeVentas");
const Arqueo = db.arqueo;
const Sesion = db.sesion;
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
        const consult2 = await Sesion.findOne({
            where: {
                id: req.body.idSesion,
                isActive: true
            }
        });
        //si el id del usuario y la sesion iniciada estan en la base de datos
        if (consult) {
            if(consult2){
                 //insertar un nuevo arqueo
                const arqueo = await Arqueo.create({   
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
        const consult2 = await Sesion.findOne({
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
                const arqueo = await Arqueo.update({
                    fechaFinal: new Date(),
                    //sumar las ventas que su idSesion sea igual al idSesion que se esta cerrando
                    efectivoCierre: db.factura.sum('totalFactura', {
                        where: {
                            idTipoPago: 1
                        }
                    }),
                    otrosPagos: db.factura.sum('totalFactura', {
                        where: {
                            idTipoPago: 2
                        }
                    }),
                    ventaCredito: db.factura.sum('totalFactura', {
                        where: {
                            idTipoPago: 3
                        }
                    }),
                    ventaTotal: db.factura.sum('totalFactura', {
                        where: {
                            idTipoPago: 1 || 2 || 3 || 4
                        }
                    }),
                    efectivoTotal: arqueo.efectivoApertura + arqueo.efectivoCierre
                }, {
                    where: {
                        idSesion: req.body.idSesion
                    }
                });//termina el update
                //validar que el arqueo se actualizo correctamente
                if(arqueo){
                    res.status(200).json({
                        message: "Arqueo actualizado correctamente",
                        data: 
                        await Arqueo.findOne({
                            where: {
                                id: req.body.idArqueo
                            }
                        })
                    });
                }
                //actualizar la sesion
                const sesion = await sesion.update({
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
        const arqueo = await Arqueo.update({
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
        //mostrar arqueo que su isDelete sea false
        const arqueo = await arqueo.findAll({
            where: {
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
        res.status(401).json({
            message: "Error al mostrar arqueo" + error.message
        });
    }
}

exports.buscarPorFechaInicioFechaFinal = async (req, res) => {
    try {
        //mostrar los arqueo que esten entre las fechas de inicio y final
        const arqueo = await arqueo.findAll({
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
        const arqueo = await Arqueo.findAll({
            where: {
                idUsuario: req.body.idUsuario,
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
            message: "Error al buscar arqueo por usuario" + error.message
        });
    }
}