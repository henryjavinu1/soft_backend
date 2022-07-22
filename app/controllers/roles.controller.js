const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const Role = db.role;
const Op = db.Sequelize.Op;

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const rol = await Role.create({
            id: req.body.id,
            rol: req.body.rol,
            descripcion: req.body.descripcion,
        });
        return res.status(200).json({
            message: "Rol creado con exito",
            data: rol
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error en el backend"
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
            return res.status(200).json({
              message: "Se le dio de baja exitosamente",
              data: bajarol
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
            return res.status(200).json({
              message: "Actualizacion exitosa",
              data: updaterol
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
        const buscarol = await Role.findAll({
            where: {
                IsDelete: false,
            }
        });
        if (!buscarol){
            return res.status(404).send({
                message: "No se encontraron roles"
            });
        } else {
            return res.status(200).json({
                message: "Roles encontrados en el backend",
                data: buscarol
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
        const buscarolname = await Role.findAll({
            where: {
                rol: req.body.RolName,
                IsDelete: false,
            }
        });
        if (!buscarolname){
            return res.status(404).send({
                message: "No se encontraron roles"
            });
        } else {
            return res.status(200).json({
                message: "Roles encontrados",
                data: buscarolname
            });
        }
    } catch (error){
        return res.status(500).send({
            message: "Error al intentar conectar al servidor"
        });
    }
}