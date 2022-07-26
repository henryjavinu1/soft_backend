const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { user, producto } = require("../models/puntoDeVentas");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;


exports.bajauser = async (req, res) => {
  // BAJA a un usuario 
  try {
      const userUpdate = await User.update({
          isDelete: true
    },{
      where: {
        id: req.body.id
      }
    });
    if (userUpdate){
        res.status(200).send({
          message: "Usuario baja en el backend"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Error al elimiar el usuario " + error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  // ACTUALIZAR UN USUARIO  
   try {
      const updateUser = await User.findOne({
            where: {
              id: req.body.id,
            }
        });
        if (!updateUser){
          return res.status(404).send({
            message: "Error al encontrar el usuario"
          });
        }else{
             try{
                const updateUser = await User.update({
                  usuario: req.body.usuario,
                  password: req.body.password,
                  email: req.body.email,
                  idEmpleado: req.body.idEmpleado,
                  idRol: req.body.idRol
                },{
                  where: {
                    id: req.body.id
                  }
                });
                  return res.status(200).send({
                    message: "Usuario Actualizado en el backend"
                  });
              } catch(error){
                 return res.status(500).send({
                  message: "Ocurrio un error en backend al actualizar"
            });
          }
        }
       
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Ocurrio un error en el backend" + error
    })
  }
}

exports.mostrarUser = async (req = request, res = response) => {
  try {
    const todoslosUsuarios = await User.findAll({
      where: {
        IsDelete: false,
      }
    });
    if (!todoslosUsuarios){
      return res.status(404).send({
        message: "Error al crear usuario en el backend"
      })
    } 
      return res.status(200).send({todoslosUsuarios});
  } catch(error) {
    console.log(error);
    return res.status(500).send({
      message: "ocurrio un error antes de entrar al catch en backend " + error
    })
  }
}