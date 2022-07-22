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
      IsDelete: true,
    },{
      where: 
        username = req.body.username,
    });
    if (!bajauser){
      return res.status(404).send({
        message: "No se pudo dar de baja al usuario"
      })
    }else {
      return res.send({
        message: "Se le dio de baja exitosamente"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};



exports.updateUser = async (req, res) => {
  // ACTUALIZAR UN USUARIO  
  try {
      const updateUser = await User.update({
        Usuario: req.body.username,
        password: req.body.password,
        email: req.body.email,
        IsDelete: true,

    },{
      where: 
        username = req.body.username,
    });
    if (!updateUser){
      return res.status(404).send({
        message: "Error al actualizar informacion del usuario"
      })
    }else {
      return res.send({
        message: "Actualizacion exitosa"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
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