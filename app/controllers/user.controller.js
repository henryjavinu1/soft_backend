const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { user } = require("../models/puntoDeVentas");
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



exports.updateUser = async (req = request, res = response) => {
  // ACTUALIZAR UN USUARIO  
  const id = req.body.id;
  const { usuario, password, email, idEmpleado, idRol } = req.body;
  console.log(id);
  try {
      const updateUser = await User.findOne({
        where: {
          id: req.body.id,
        },
    });
    if (!updateUser){
      return res.status(404).send({
        message: "Error al encontrar el usuario"
      })
    }
    //validaUser(updateUser, usuario, password, email,idEmpleado, idRol)
    updateUser.save();
    return res.status(200).send({
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Ocurrio un error en el backend" + error.message + 'validaUser'
    })
  }
};

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