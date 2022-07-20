const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Sesion = db.sesion;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sesion } = require("../models/puntoDeVentas");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      usuario: req.body.UserName,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      idEmpleado: req.body.idEmpleado,
      idRol: req.body.idRol
    });

    return res.status(200).json({
      message: "Usuario creado con exito",    
      data: user
  });
  }
catch (error) {
  return res.status(500).send({
      message: "Ocurrio un error"
  });
}
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        usuario: req.body.username,
        isDelete: false
      },
      include: [{
        model: db.role,
        include: [{
          model: db.permiso,
        }]
      }, {
        model: db.empleado,
      }, {
        model: db.sesion,
      }]
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Warning! Invalid Password!",
      });
    }

    const token = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400, // 24 horas de ducración de tokens
    });

    req.session.token = token;
    const ses = await Sesion.create({
      idUsuario:user.id,
      token:token
    });
    const resp = {
      id: user.id,
      usuario: user.usuario,
      empleado: user.empleado,
      rol: user.role,
      sesion:ses
    }
    return res.status(200).send(resp);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};