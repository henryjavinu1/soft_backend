const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { permiso } = require("../models/puntoDeVentas");
const Role = db.role;
const Op = db.Sequelize.Op;

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const rol = await Role.create({
            rol: req.body.rol,
            descripcion: req.body.descripcion,
        });
        return res.status(200).send(rol);
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//Dando de Baja a Rol
exports.bajarol = async (req, res) => {
    try {
        const bajarol = await Role.update({
            IsDelete: true,
        });
        if (!bajarol){
            return res.status(404).send({
              message: "No se pudo dar de baja al rol"
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

exports.updaterol = async (req, res) => {
    try {
        const updaterol = await Role.update({
            rol: req.body.rol,
            descripcion: req.body.descripcion,
        },{
           where:
            id = req.body.id, 
        });
        if (!updaterol){
            return res.status(404).send({
              message: "Error al actualizar el rol"
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

