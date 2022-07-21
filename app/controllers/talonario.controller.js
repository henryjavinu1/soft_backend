const { request, response } = require('express');
const db = require("../models/puntoDeVentas");
const Talonario = db.talonario;

exports.getTalonarios = async (req = request, res = response) => {
    try {
        const talonarios = await Talonario.findAll({
            where: {
                idDelete: false
            }
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

exports.getTalonariosAll = async (req = request, res = response) => {
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
            rangoInicialFactura: req.body.rangoInicialFactura,
            rangoFinalFactura: req.body.rangoFinalFactura,
            cai: req.body.cai,
            fechaLimiteEmision: req.body.fechaLimiteEmision,
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
            rangoInicialFactura: req.body.rangoInicialFactura,
            rangoFinalFactura: req.body.rangoFinalFactura,
            cai: req.body.cai,
            fechaLimiteEmision: req.body.fechaLimiteEmision,
        },{
            where: {
                idTalonario: req.body.idTalonario,
            }
        });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.activateTalonario = async (req = request, res = response) => {
    try {
        const talonario = await Talonario.update({
            active: 1
        },{
            where: {
                idTalonario: req.body.idTalonario,
            }
        });
        return res.status(200).send(talonario);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.disactivateTalonario = async (req = request, res = response) => {
    try {
        const talonario = await Talonario.update({
            active: 0
        },{
            where: {
                idTalonario: req.body.idTalonario,
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