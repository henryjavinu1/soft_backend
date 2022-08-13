const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const db = require('../models/puntoDeVentas');
const roles_pepermisos = db.roles_permisos;

exports.crearolpermiso = async (req, res) => {
    try {
        const rol = await roles_pepermisos.bulkCreate(req.body);
        return res.status(200).json({
            message: "rolpermiso creado con exito",
            data: rol,
            
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error en el backend" + error
        });
    }
}