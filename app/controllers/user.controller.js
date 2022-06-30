const db = require("../models/user");
const config = require("../config/auth.config");
const { user } = require("../models/user");
const User = db.user;
const Role = db.role;
const Sesion = db.sesion;
const Op = db.Sequelize.Op;

exports.bajauser = async (req, res) => {
  // BAJA a un usuario 
  try {
    const user = await user.findOne({
      where: {
        username: req.body.username,
        IsDelete: false,
      }
    })
    const userUpdate = await user.update({
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
