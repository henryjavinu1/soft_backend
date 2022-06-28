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

db.user = require("../../models/user.model.js")(sequelize, Sequelize);
db.role = require("../../models/role.model.js")(sequelize, Sequelize);
db.permiso = require("../../models/permiso.model.js")(sequelize, Sequelize);
db.empleado = require("../../models/empleado.model.js")(sequelize, Sequelize);
db.sesion = require("../../models/sesion.model.js")(sequelize, Sequelize);
db.producto = require("../../models/producto.model.js")(sequelize, Sequelize);
db.tipoproducto = require("../../models/tipoproducto.model.js")(sequelize, Sequelize);

/////// RELACIÓN DE UNO A UNO /////////
//// UN USUARIO PERTENECE A UN EMPLEADO, UN EMPLEADO TIENE UN USUARIO ////
db.empleado.hasOne(db.user,{
  foreignKey: {
    name: 'idEmpleado', allowNull: false 
  }
});
db.user.belongsTo(db.empleado,{
  foreignKey: {
    name: 'idEmpleado', allowNull: false 
  }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE UN ROL, UN ROL TIENE MUCHOS USUARIOS(1:N)////
db.role.hasMany(db.user,{
  foreignKey: { name:'idRol', allowNull: false }
});
db.user.belongsTo(db.role,{
  foreignKey: { name:'idRol', allowNull: false }
});
////////////////////////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN USUARIO TIENE MUCHAS SESIONES, UN SESION TIENE UN USUARIOS(1:N)////
db.user.hasMany(db.sesion,{
  foreignKey: { name:'idUsuario', allowNull: false }
});
db.sesion.belongsTo(db.user,{
  foreignKey: { name:'idUsuario', allowNull: false }
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
/////////////////////////////////////////////////
////////// Relacion de 1 a 1 ////////////////////
// El produto tiene un tipo de///////////////////
/////////////////////////////////////////////////

db.tipoproducto.hasOne(db.producto, {
  foreignKey: { name: "idTipoProducto", allowNull: false },
});
db.producto.belongsTo(db.tipoproducto, {
  foreignKey: { name: "idTipoProducto", allowNull: false },
});


module.exports = db;
