const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/puntoDeVentas");
const User = db.user;
const Rol = db.role;
const RolPermiso = db.roles_permisos;
const Permiso = db.permiso;


/////////////////////////////////////////////////////////

//Middleware permiso venta

isVentas = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['idRol'],
      raw: true,
      where: {
        usuario: req.body.username
      },
    })

    const rol = await Rol.findOne({
      raw: true,
      where: {
        id: user.idRol
      },

    })
    const rolpermiso = await RolPermiso.findAll({
      raw: true,
      where: {
        idRol: rol.id
      },
    })

    const permisos = []

    for (let i = 0; i < rolpermiso.length; i++) {
      const permiso = await Permiso.findOne({
        raw: true,
        attributes: ['permiso'],
        where: {
          id: rolpermiso[i].idPermiso
        },
      })
      permisos.push(permiso)
    }

    const isVenta = permisos.some(permiso => permiso.permiso === "Modulo de Ventas");

    if (isVenta){
      return next();
    }
    else{
      return res.status(403).send({
        message: "Requiere permiso Modulo de Ventas",
      });
    }


  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

/////////////////////////////////////////////////////////////////////////////

//Permiso Mantenimiento


isMantenimiento = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['idRol'],
      raw: true,
      where: {
        usuario: req.body.username
      },
    })

    const rol = await Rol.findOne({
      raw: true,
      where: {
        id: user.idRol
      },

    })
    const rolpermiso = await RolPermiso.findAll({
      raw: true,
      where: {
        idRol: rol.id
      },
    })

    const permisos = []

    for (let i = 0; i < rolpermiso.length; i++) {
      const permiso = await Permiso.findOne({
        raw: true,
        attributes: ['permiso'],
        where: {
          id: rolpermiso[i].idPermiso
        },
      })
      permisos.push(permiso)
    }

    const isMantenimiento = permisos.some(permiso => permiso.permiso === "mantenimiento");

    if (isMantenimiento){
      return next();
    }
    else{
      return res.status(403).send({
        message: "Requiere permiso Mantenimiento",
      });
    }


  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};



//////////////////////////////////////////////////////////////////////////
// Modulo de Inventario

isInventario = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['idRol'],
      raw: true,
      where: {
        usuario: req.body.username
      },
    })

    const rol = await Rol.findOne({
      raw: true,
      where: {
        id: user.idRol
      },

    })
    const rolpermiso = await RolPermiso.findAll({
      raw: true,
      where: {
        idRol: rol.id
      },
    })

    const permisos = []

    for (let i = 0; i < rolpermiso.length; i++) {
      const permiso = await Permiso.findOne({
        raw: true,
        attributes: ['permiso'],
        where: {
          id: rolpermiso[i].idPermiso
        },
      })
      permisos.push(permiso)
    }

    const isInventario = permisos.some(permiso => permiso.permiso === "Modulo de Inventario");

    if (isInventario){
      return next();
    }
    else{
      return res.status(403).send({
        message: "Requiere permiso Modulo de Inventario",
      });
    }


  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

////////////////////////////////////////////////////////////////////
//Modulo Gestion de usuarios


//////////////////////////////////////////////////////////////////////////
// Modulo de Inventario

isGesUsuarios = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['idRol'],
      raw: true,
      where: {
        usuario: req.body.username
      },
    })

    const rol = await Rol.findOne({
      raw: true,
      where: {
        id: user.idRol
      },

    })
    const rolpermiso = await RolPermiso.findAll({
      raw: true,
      where: {
        idRol: rol.id
      },
    })

    const permisos = []

    for (let i = 0; i < rolpermiso.length; i++) {
      const permiso = await Permiso.findOne({
        raw: true,
        attributes: ['permiso'],
        where: {
          id: rolpermiso[i].idPermiso
        },
      })
      permisos.push(permiso)
    }

    const isGesUsuarios = permisos.some(permiso => permiso.permiso === "Modulo de Gestion de usuarios");

    if (isGesUsuarios){
      return next();
    }
    else{
      return res.status(403).send({
        message: "Requiere permiso Modulo de Gestion de Usuarios",
      });
    }


  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};






const permisosJwt = { 
  isVentas,
  isMantenimiento,
  isInventario,
  isGesUsuarios
};
module.exports = permisosJwt;
