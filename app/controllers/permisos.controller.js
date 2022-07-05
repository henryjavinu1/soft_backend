const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { permiso } = require("../models/puntoDeVentas");
const { permiso } = require("../models/puntoDeVentas");
const Permiso = db.permiso;
const Op = db.Sequelize.Op;

//Creando un permiso

exports.creapermiso = async (req, res) => {
    try {
        const permiso = await Permiso.create({
            permiso: req.body.permiso,
            descripcion: req.body.descripcion, 
        });
        return res.status(200).send(permiso);
        }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
    }

//BAJA PERMISO
exports.bajapermiso = async (req, res) => {
    try {
        const bajapermiso = await Permiso.update({
            IsDelete: true,
        });
        if (!bajapermiso){
            return res.status(404).send({
              message: "No se pudo dar de baja al permiso"
            })
          }else {
            return res.send({
              message: "Se le dio de baja exitosamente"
            })
          }
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//ACTUALIZACION DE PERMISO
exports.updatepermiso = async (req, res) => {
    try {
        const updatepermiso = await Permiso.update({
            permiso: req.body.rol,
            descripcion: req.body.descripcion,
        },{
           where:
            id = req.body.id, 
        });
        if (!updatepermiso){
            return res.status(404).send({
              message: "Error al actualizar el permiso"
            })
          }else {
            return res.send({
              message: "Actualizacion exitosa"
            })
          }
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}