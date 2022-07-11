const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { permiso } = require("../models/puntoDeVentas");
const Role = db.role;
const Op = db.Sequelize.Op;

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const rol = await db.role.create({
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
        const bajarol = await db.role.update({
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
        const updaterol = await db.role.update({
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

// Consulta que me trae todos los roles activos
exports.buscarol = async (req, res) => {
    try {
        const buscarol = await db.role.findAll({
            where: {
                IsDelete: false,
            }
        });
        if (!buscarol){
            return res.status(404).send({
                message: "No se encontraron roles"
            });
        } else {
            return res.status.send ({
                message: "Roles encontrados",
                Roles: buscarol
            });
        }


    } catch (error){
        return res.status(500).send({
            message: "Error al intentar conectar al servidor"
        });
    }
}

// Consulta que me trae busqueda por nombre de rol
exports.buscarolname = async (req, res) => {
    try {
        const buscarolname = await db.role.findAll({
            where: {
                IsDelete: false,
                rol: req.body.rol,
            }
        });
        if (!buscarolname){
            return res.status(404).send({
                message: "No se encontraron roles"
            });
        } else {
            return res.status.send ({
                message: "Roles encontrados",
                Roles: buscarolname
            });
        }
    } catch (error){
        return res.status(500).send({
            message: "Error al intentar conectar al servidor"
        });
    }
}

