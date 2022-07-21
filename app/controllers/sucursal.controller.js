const { request, response } = require('express');
const db = require("../models/puntoDeVentas");
const Sucursal = db.sucursal;

exports.getSucursal = async (req = request, res = response) => {
    try {
        const sucursal = await Sucursal.findOne({
            where: {
                idSucursal: req.body.idSucursal,
            }
        });
        return res.status(200).send({
            sucursal,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}

exports.updateSucursal = async (req = request, res = response) => {
    try {
        const sucursal = await Sucursal.update({
            nombreSucursal: req.body.nombreSucursal,
            lemaSucursal: req.body.lemaSucursal,
        },{
            where: {
                idSucursal: req.body.idSucursal,
            }
        });
        return res.status(200).send(sucursal);
    } catch (error) {
        return res.status(500).send({
            message: "Error"
        });
    }
}