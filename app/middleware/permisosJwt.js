const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { user } = require("../models/puntoDeVentas");
const db = require("../models/puntoDeVentas");
const User = db.user;
const RolPermiso = db.roles_permisos;



/////////////////////////////////////////////////////////

const isPermisos = (permisos) => {

  return async (req, res, next) => {
    let token = req.session.token;
    const decoded = jwt.verify(token, config.secret)
    try {
      const user = await User.findOne({
        raw: true,
        where: {
          id: decoded.id
        }
      })
  
      const rolpermiso = await RolPermiso.findOne({
        raw: true,
        where: {
          idRol : user.idRol,
          idPermiso: 2
        }
      })
  
      if(rolpermiso){
        next()
      }else{
      return res.status(402).send({
        message: "No tienes el permiso necesario",
      });
    }
    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate User role!",
      });
    }
  }
};


const permisosJwt = {
  isPermisos,
};
module.exports = permisosJwt;
