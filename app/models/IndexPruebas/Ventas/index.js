const config = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../user.model.js")(sequelize, Sequelize);
db.role = require("../role.model.js")(sequelize, Sequelize);
db.permiso = require("../permiso.model.js")(sequelize, Sequelize);
db.empleado = require("../empleado.model.js")(sequelize, Sequelize);
db.sesion = require("../sesion.model.js")(sequelize, Sequelize);
db.ventas = require("../ventas.model.js")(sequelize, Sequelize);
db.detalle_venta = require("../detalle_venta.model.js")(sequelize, Sequelize);
db.clientes = require("../clientes.model.js")(sequelize, Sequelize);
db.producto = require("../producto.model.js")(sequelize, Sequelize);

/////// RELACIÓN DE UNO A UNO /////////
//// UN USUARIO PERTENECE A UN EMPLEADO, UN EMPLEADO TIENE UN USUARIO ////
db.empleado.hasOne(db.user, {
  foreignKey: {
    name: 'idEmpleado', allowNull: false
  }
});
db.user.belongsTo(db.empleado, {
  foreignKey: {
    name: 'idEmpleado', allowNull: false
  }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE UN ROL, UN ROL TIENE MUCHOS USUARIOS(1:N)////
db.role.hasMany(db.user, {
  foreignKey: { name: 'idRol', allowNull: false }
});
db.user.belongsTo(db.role, {
  foreignKey: { name: 'idRol', allowNull: false }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE MUCHAS SESIONES, UN SESION TIENE UN USUARIOS(1:N)////
db.user.hasMany(db.sesion, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});
db.sesion.belongsTo(db.user, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});
////////////////////////////////////////////
/////// RELACIÓN DE MUCHOS A MUCHOS /////////
//// UN ROL TIENE MUCHOS PERMISOS, UN PERMISO ESTA EN MUCHOS ROLES(N:M)////
db.permiso.belongsToMany(db.role, {
  through: "roles_permisos",
  foreignKey: "idRol",
  otherKey: "idPermiso"
});
db.role.belongsToMany(db.permiso, {
  through: "roles_permisos",
  foreignKey: "idRol",
  otherKey: "idPermiso"
});
////////////////////////////////////////////
// relaciones de ventas
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNA VENTA PERTENECE A UNA SESION, UNA SESION PERTENECE A MUCHAS VENTAS(1:N)////
db.sesion.hasMany(db.ventas, {
  foreignKey: { name: 'idSesion', allowNull: false }
});
db.ventas.belongsTo(db.sesion, {
  foreignKey: { name: 'idSesion', allowNull: false }
});

////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO REALIZA MUCHAS VENTAS, UNA VENTA LA REALIZA 1 USUARIO(1:M)////
db.user.hasMany(db.ventas, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});
db.ventas.belongsTo(db.user, {
  foreignKey: { name: 'idUsuario', allowNull: false }
});

////////////////////////////////////////////
/////relacion de uno a muchos //////////
///// un cliente produce muchas ventas, una venta la produce un cliente 
db.clientes.hasMany(db.ventas, {
  foreignKey: { name: 'idCliente', allowNull: false }
});
db.ventas.belongsTo(db.clientes, {
  foreignKey: { name: 'idCliente', allowNull: false }
  });


  ////////////relaciones de detalle venta
  /////////////////////////////////////
  //////de uno a muchos ///////
  /// 1 venta pertenece a muchos detalles ventas, un detalle venta pertenece a 1 venta
  db.ventas.hasMany(db.detalle_venta, {
    foreignKey: { name: 'idVentas', allowNull: false }
  });
  db.detalle_venta.belongsTo(db.ventas, {
    foreignKey: { name: 'idVentas', allowNull: false }
  });

    /////////////////////////////////////
  //////de uno a muchos ///////
  /// 1 producto pertenece a muchos detalle_venta, un detalle_venta tiene un producto
  db.producto.hasMany(db.detalle_venta, {
    foreignKey: { name: 'idProducto', allowNull: false }
  });
  db.detalle_venta.belongsTo(db.producto, {
    foreignKey: { name: 'idProducto', allowNull: false }
  });


module.exports = db;
