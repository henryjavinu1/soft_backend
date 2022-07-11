const { request, response } = require('express');
const db = require("../models/puntoDeVentas");
const Talonario = db.talonario;

exports.getTalonarios = async (req = request, res = response) => {
    try {
        const talonarios = await Talonario.findAll({
            
        });
        return res.status(200).send({
            talonarios,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.createTalonario = async (req = request, res = response) => {
    try {
        const talonario = await Talonario.create({
            rangoInicialFactura: req.query.rangoInicialFactura,
            rangoFinalFactura: req.query.rangoFinalFactura,
            cai: req.query.cai,
            fechaLimiteEmision: req.query.fechaLimiteEmision,
            active: req.query.active
        });
        console.log(talonario);
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.updateTalonario = async (req = request, res = response) => {
    try {
        const talonario = await Talonario.update({
            rangoInicialFactura: req.query.rangoInicialFactura,
            rangoFinalFactura: req.query.rangoFinalFactura,
            cai: req.query.cai,
            fechaLimiteEmision: req.query.fechaLimiteEmision,
            active: req.query.active
        },{
            where: {
                idTalonario: req.query.idTalonario,
            }
        });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.deleteTalonario = async (req = request, res = response) => {
    try {
        const talonario = await Talonario.update({
            isDelete: true
        },{
            where: {
                idTalonario: req.query.idTalonario,
            }
        });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}