const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const detalleventaModel = require("../models/detalleventa.model");
const { ARRAY } = require("sequelize");
const TipoPago = db.tipopago;
const { impresionDeTipoPago} = require('../helpers/tipopago.helper');
const { impresionDeVentas } = require("../helpers/extraerventas.helper");
const Op = db.Sequelize.Op;
//Insertar tipo de pago
exports.insertarTipoPago = async (req, res) => {
    try {
              const tipopagoo = await db.tipopago.create({
                tipoDePago : req.body.tipoDePago, 
                descripcionTipoPago: req.body.descripcionTipoPago, 
        });
        return res.status(200).send({
            message: "Tipo de pago ingresado",
            tipopagoo: tipopagoo //Efecto de prueba
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Actualizar TipoPago
exports.updateTipoPago = async (req, res) => {
            try {
                const tipopago = await TipoPago.update({
                    tipoDePago: req.body.tipoDePago,
                    descripcionTipoPago: req.body.descripcionTipoPago,
                    isDelete: false
                } , {
                    where: {
                        idTipoPago: parseInt(req.body.idTipoPago)
                    }
                });
                return res.status(200).send({
                    message: "Tipo de pago actualizado."
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: "Ocurrio un error "  + error
                });
            }
            } 

//Buscar tipo de pago MostrarTipo de pagos 
exports.findTipoPago = async (req, res) => {
    try {
        const tipopago = await db.tipopago.findAll({
            where: {
                isDelete: false,
            }
        });
       
        const tipopagos = impresionDeTipoPago(tipopago);
        res.json({
            tipopagos
        })
        
    } catch (error) {
       
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar por id  revisar
exports.findTipoPagoid = async (req, res) => {
    try {
        const tipopago = await db.tipopago.findOne({
            where: {
                idTipoPago: parseInt(req.body.idTipoPago),
                isDelete: false,
            }
        });
        if (!tipopago) {
            return res.status(404).send({
                message: "El tipo de pago no existe"
            });
        } else {
            return res.status(200).json({
                tipopago});
        }
    } catch (error) {
       
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Eliminar Tipo Pago isDelete: false == isDelete: true
exports.deleteTipoPago = async (req, res) => {
    try {
        const tipopago = await TipoPago.update({
            isDelete: true
        } , {
            where: {
                idTipoPago: parseInt(req.body.idTipoPago)
            }
        });
        return res.status(200).send({
            message: "Tipo de pago eliminado."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error "  + error
        });
    }
}
