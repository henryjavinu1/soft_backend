db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const e = require("express");
const { response } = require("express");
const User = db.user;
const Ventas = db.ventas;
const Cliente = db.cliente;

//const Op = db.Sequelize.Op;
const { Op } = require("sequelize");
const { impresionDeVentas } = require("../helpers/extraerventas.helper");
const { detalleventa, ventas } = require("../models/puntoDeVentas");


exports.findAllVenta = async (req, res) =>{
    try {
        const ventas = await Ventas.findAll({
            where: {
                isDelete: false,
            }, 
           include:[{
               model: db.user,
                include:[{
                    model: db.empleado,
                 
                }]
               }, 
              {
                model: db.cliente,
              }, {
                model: db.detalleventa,
              }] 
        });
        if (!ventas) {
            return res.status(404).send({
                message: "No hay registros."
            });
        } else {
            
            const venta = impresionDeVentas(ventas);
            res.json({
                venta,
                detalleventa
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
