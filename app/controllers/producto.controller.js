//db = require("../models/produ");
const config = require("../config/auth.config");
const db = require("../models/puntoDeVentas");
const e = require("express");
const { response } = require("express");
const Producto = db.producto;
const TipoProducto = db.tipoProducto;
//const Op = db.Sequelize.Op;
const { Op } = require("sequelize");
const { tipoproducto } = require("../models/puntoDeVentas");


// Pucha
exports.createproducto = async (req = request, res = response) => {   
    try {
        const producto = await Producto.create({
            codigoProducto: req.body.codigoProducto,
            nombreProducto: req.body.nombreProducto,
            precioProducto: req.body.precioProducto,
            cantidadProducto: req.body.cantidadProducto,
            isvProducto: req.body.isvProducto,
            descProducto: req.body.descProducto,
            isExcento: req.body.isExcento,
            isDelete: false,
            idTipoProducto: req.body.idTipoProducto
        });
        return res.status(200).send({
            message: "Producto creado."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error al almacenar el producto." + error
        });
    }
}

exports.findOne = async (req, res) =>{
    try {
        const producto = await Producto.findOne({
            where: {
                isDelete: false,
                [Op.and]: [{nombreProducto: req.body.nombreProducto}, {isDelete: false}]                
            }, include:[{
                model: db.tipoproducto,
                atributes: ['id','tipoProducto']
               }
           ]
        });
        if (!producto) {
            return res.status(404).send({
                message: "El producto no existe"
            });
        } else {
            return res.status(200).send({
                message: "El producto existe",
                producto: producto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

exports.buscarxcodigo = async (req, res) =>{
    try {
        const producto = await Producto.findOne({
            where: {
                isDelete: false,
                [Op.and]: [{codigoProducto: req.body.codigoProducto}, {isDelete: false}]                
            }, include:[{
                model: db.tipoproducto,
                atributes: ['id','tipoProducto']
               }
           ]
        });
        if (!producto) {
            return res.status(404).send({
            });
        } else {
            return res.status(200).send({
                producto: producto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

exports.findAll = async (req, res) =>{
    try {
        const producto = await Producto.findAll({
            where: {
                isDelete: false,
                [Op.and]: [{isDelete: false}]                
            }, include:[{
                model: db.tipoproducto,
                atributes: ['id','tipoProducto']
               }
           ]
        });
        if (!producto) {
            return res.status(404).send({
                message: "No hay registros actualmente."
            });
        } else {
            return res.status(200).send({
                producto: producto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const producto = await Producto.findOne({
            where: {
                id: req.body.id,
                isDelete: false
            }
        });
        if (!producto) {
            return res.status(404).send({
                message: "No existe el producto ingresado."
            });
        } else {
            try {
                const producto = await Producto.update({
                    codigoProducto: req.body.codigoProducto,
                    nombreProducto: req.body.nombreProducto,
                    precioProducto: req.body.precioProducto,
                    cantidadProducto: req.body.cantidadProducto,
                    isvProducto: req.body.isvProducto,
                    descProducto: req.body.descProducto,
                    isExcento: req.body.isExcento,
                    isDelete: false,
                    idTipoProducto: req.body.idTipoProducto
                } , {
                    where: {
                        id: req.body.id
                    }
                });
                return res.status(200).send({
                    message: "Producto actualizado."
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: "Ocurrio un error al actualizar el producto."  + error
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }   
}

exports.setsaldo = async (req, res) => {
    var saldoRecibir  = req.body.saldoRestar;
    var saldoActual = req.body.saldoActual;
    try {
        const producto = await Producto.findOne({
            where: {
                id: req.body.id,
                isDelete: false
            }
        });
        if (!producto) {
            return res.status(404).send({
                message: "No existe el producto ingresado."
            });
        } else {
            try {
                const producto = await Producto.update({
                    cantidadProducto: saldoActual - saldoRecibir,
                } , {
                    where: {
                        id: req.body.id
                    }
                });
              
                return res.status(200).send({
                    message: "Producto actualizado."
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: "Ocurrio un error al actualizar el producto."  + error
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }   
}



exports.delete = async (req, res) => {
    try {
        const producto = await Producto.update({
            isDelete: true
        } , {
            where: {
                id: req.body.id,
                isDelete: false
            }
        });
        return res.status(200).send({
            message: "Producto eliminado."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error al eliminar el producto."  + error
        });
    }
}

exports.updateSaldo = async (req, res) => {
    try {
        const producto = await Producto.findOne({
            where: {
                codigoProducto: req.body.codigoProducto,
                isDelete: false
            }
        });
        if (!producto) {
            return res.status(404).send({
                message: "No existe el producto ingresado."
            });
        } else {
            try {
                const producto = await Producto.update({
                    cantidadProducto: req.body.cantidadProducto,
                },  {
                    where: {
                        codigoProducto: req.body.codigoProducto
                    }
                });
                return res.status(200).send({
                    message: "Producto actualizado."
                });
    
            } catch (error) {
                return res.status(500).send({
                    message: "Ocurrio un error al actualizar el producto."  + error
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }   
}
