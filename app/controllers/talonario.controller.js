const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const Talonario = db.talonario;
const Op = db.Sequelize.Op;

exports.getTalonarios = async (req, res) => {
    try {
        const talonarios = Talonario.findAll({
            
        });
        return res.status(200).send({
            talonarios: talonarios,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.createTalonario = async (req, res) => {
    try {
        const talonario = await Talonario.create({
            rangoInicialFactura: req.body.rangoInicialFactura,
            rangoFinalFactura: req.body.rangoFinalFactura,
            cai: req.body.cai,
            fechaLimiteEmision: req.body.fechaLimiteEmision,
            active: req.body.active
        });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.updateTalonario = async (req, res) => {
    try {
        const talonario = await Talonario.update({
            rangoInicialFactura: req.body.rangoInicialFactura,
            rangoFinalFactura: req.body.rangoFinalFactura,
            cai: req.body.cai,
            fechaLimiteEmision: req.body.fechaLimiteEmision,
            active: req.body.active
        },{
            where:
             idTalonario = req.body.idTalonario, 
         });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.deleteTalonario = async (req, res) => {
    try {
        const talonario = await Talonario.update({
            isDelete: true
        },{
            where:
             idTalonario = req.body.idTalonario, 
         });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}