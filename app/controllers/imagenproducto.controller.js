const config = require("../config/auth.config");
const db = require("../models/puntoDeVentas");
const e = require("express");
const { response } = require("express");
const ImagenProducto = db.imagenproducto;
const Producto = db.producto;
const { Op } = require("sequelize");
const { producto } = require("../models/puntoDeVentas");
const { imagenproducto } = require("../models/puntoDeVentas");
const multer = require('multer');
const path = require('path')

exports.createimage = async (req = request, res = response) => {   
    try {
        const imagenproducto = await ImagenProducto.create({
            image: req.file.path,
            idProducto: req.body.idProducto
        });
        return res.status(200).send({
            message: "Imagen almacenada."
        });

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error guardar la imagen." + error
        });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

exports.findOne = async (req, res) =>{
    try {
        const imagenproducto = await ImagenProducto.findOne({
            where: {
                idProducto: req.body.idProducto     
            }, 
        });
        if (!imagenproducto) {
            return res.status(404).send({
                message: "No hay imagenes de ese producto"
            });
        } else {
            return res.status(200).send({
                imagenproducto: imagenproducto
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
