const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const Role = db.role;
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const rol = await Role.create({
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
            isDelete: true
        },{
            where: {
                id:req.body.id
            }
        });
        if (bajarol){
            res.status(200).send({
              message: "baja al rol en backend"
            });
          }
    }catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Ocurrio un error al dar de baja" + error.message
        });
    }
};
exports.updaterol = async (req, res) => {
    // ACTUALIZAR UN USUARIO  
     try {
        const updateRol = await Role.findOne({
              where: {
                id: req.body.id,
              }
          });
          if (!updateRol){
            return res.status(404).send({
              message: "Error al encontrar el Rol"
            });
          }else{
               try{
                  const updateRol = await Role.update({
                    rol: req.body.rol,
                    descripcion: req.body.descripcion,                    
                  },{
                    where: {
                      id: req.body.id
                    }
                  });
                    return res.status(200).send({
                      message: "Rol Actualizado en el backend"
                    });
                } catch(error){
                   return res.status(500).send({
                    message: "Ocurrio un error en backend al actualizar"
              });
            }
          }
          //validaUser(updateUser, usuario, password, email,idEmpleado, idRol)
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Ocurrio un error en el backend" + error
      });
    }
  }// Consulta que me trae todos los roles activos
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
            message: "Error al intentar conectar al servido"
        });
    }
}

exports.mostrarRol = async (req = request, res = response) => {
    try {
      const todoslosRoles = await Role.findAll({
        where: {
          IsDelete: false,
        }
      });
      if (!todoslosRoles){
        return res.status(404).send({
          message: "Error al crear usuario en el backend"
        })
      } 
        return res.status(200).send({todoslosRoles});
    } catch(error) {
      console.log(error);
      return res.status(500).send({
        message: "ocurrio un error antes de entrar al catch en backend " + error
      })
    }
  }