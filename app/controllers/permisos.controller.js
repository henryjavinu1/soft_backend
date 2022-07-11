const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
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

// Consulta que me trae todos los permisos activos
exports.buscapermiso = async (req, res) => {
    try {
        const buscapermiso = await Permiso.findAll({
            where: {
                IsDelete: false,
            }
        });
        if (!buscapermiso){
            return res.status(404).send({
                message: "No se encontraron permisos"
            });
        } else {
            return res.status(200).json ({
                message: "permisos encontrados",
                data: buscapermiso
            });
        }
    } catch (error){
        return res.status(500).send({
            message: "Error al intentar conectar al servidor"
        });
    }
}

// Consulta busca por nombre permiso
exports.buscapermisoname = async (req, res) => {
    try {
        const buscapermisoname = await Permiso.findAll({
            where: {
                permiso: req.body.PermisoName,
                IsDelete: false,
            }
        });
        if (!buscapermisoname){
            return res.status(404).send({
                message: "No se encontro permiso"
            });
        } else {
            return res.status(200).json({
                message: "permiso encontrado",
                data: buscapermisoname
            });
        }
    } catch (error){
        return res.status(500).send({
            message: "Error al intentar conectar al servidor"
        });
    }
}