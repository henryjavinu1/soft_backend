db = require("../models/producto");
const config = require("../config/auth.config");
const e = require("express");
const { response } = require("express");
const User = db.user;
const TipoProducto = db.tipoproducto;
//const Op = db.Sequelize.Op;
const { Op } = require("sequelize");

// Pucha
exports.createtipoproducto = async (req = request, res = response) => {   
    try {
        const tipoproducto = await TipoProducto.create({
            tipoProducto: req.body.tipoProducto,
            descripcionProducto: req.body.descripcionProducto,
            isvTipoProducto: req.body.isvTipoProducto,
            isDelete: false
        });
        return res.status(200).send({
            message: "Tipo producto creado."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error al almacenar el tipo de producto."
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const tipoproducto = await TipoProducto.update({
            isDelete: true
        } , {
            where: {
                id: req.body.id,
                isDelete: false
            }
        });
        return res.status(200).send({
            message: "Tipo de producto eliminado."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error al eliminar el tipo de producto."  + error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const tipoproducto = await TipoProducto.findOne({
            where: {
                id: req.body.id,
                isDelete: false
            }
        });
        if (!tipoproducto) {
            return res.status(404).send({
                message: "No existe ese tipo de producto."
            });
        } else {
            try {
                const tipoproducto = await TipoProducto.update({
                    tipoProducto: req.body.tipoProducto,
                    descripcionProducto: req.body.descripcionProducto,
                    isvTipoProducto: req.body.isvTipoProducto,
                    isDelete: false
                } , {
                    where: {
                        id: req.body.id
                    }
                });
                return res.status(200).send({
                    message: "Tipo de producto actualizado."
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: "Ocurrio un error al actualizar el tipo de producto."  + error
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }   
}

exports.findAll = async (req, res) =>{
    try {
        const tipoproducto = await TipoProducto.findAll({
            where: {
                isDelete: false,
            }
        });
        if (!tipoproducto) {
            return res.status(404).send({
                message: "No hay registros."
            });
        } else {
            return res.status(200).send({
                message: "Registros encontrados: ",
                tipoProducto: tipoproducto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

exports.findOne = async (req, res) => {
    /*
    const tipoProductoBuscar = await TipoProducto.findOne({
        where: {
            tipoproducto: {
                  [Op.like]: `%${tipoProducto}%`,
            }
        },
    });
    */

    try {
        const tipProducto = await TipoProducto.findOne({
            where: {
                isDelete: false,
                tipoProducto: req.body.tipoProducto
            }
        });
        if (!tipProducto) {
            return res.status(404).send({
                message: "El tipo de producto no existe"
            });
        } else {
            return res.status(200).send({
                message: "El tipo de producto existe",
                tipoProducto: tipProducto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
