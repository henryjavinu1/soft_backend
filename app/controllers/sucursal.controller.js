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

exports.getSucursales = async (req = request, res = response) => {
    try {
        const sucursales = await Sucursal.findAll({
        });
        return res.status(200).send({
            sucursales,
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
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            rtn: req.body.rtn,
            logo: req.body.logo,
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