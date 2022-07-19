db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const e = require("express");
const { response } = require("express");
const User = db.user;
const Ventas = db.ventas;
const Cliente = db.cliente;

//const Op = db.Sequelize.Op;
const { Op } = require("sequelize");


exports.findAll = async (req, res) =>{
    try {
        const ventas = await Ventas.findAll({
            where: {
                isDelete: false,
            }
        });
        if (!ventas) {
            return res.status(404).send({
                message: "No hay registros."
            });
        } else {
            return res.status(200).send({
                Ventas: ventas 
                , include:[{
                    model: db.cliente,
                    atributes: ['id','idCliente']
                   }],
                include:[{
                    model: db.user,
                    atributes: ['id','idUsuario']
                   }]
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}


