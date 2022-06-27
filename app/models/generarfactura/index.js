const config = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    //operatorsAliases: false,

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
db.tipopago = require("../../models/tipopago.model.js")(sequelize, Sequelize);
db.factura = require("../../models/factura.model.js")(sequelize, Sequelize);
db.venta = require("../../models/venta.model.js")(sequelize, Sequelize);
db.cliente = require("../../models/cliente.model.js")(sequelize, Sequelize);
db.talonario = require("../../models/talonario.model.js")(sequelize, Sequelize);
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
//KATIA
/////// RELACIÓN DE MUCHOS A UNO /////////
//// UNA FACTURA TIENE UN TIPOPAGO, UN TIPOPAGO TIENE MUCHOS FACTURAS(M:1)////
db.tipopago.hasMany(db.factura,{
  foreignKey: { name:'idTipoPago', allowNull: false }
});
db.factura.belongsTo(db.tipopago,{
  foreignKey: { name:'idTipoPago', allowNull: false }
});
//// UNA FACTURA TIENE UN cliente, UN cliente TIENE MUCHOS FACTURAS(M:1)////
db.cliente.hasMany(db.factura,{
  foreignKey: { name:'idCliente', allowNull: false }
});
db.factura.belongsTo(db.cliente,{
  foreignKey: { name:'idCliente', allowNull: false }
});
//// UNA FACTURA TIENE UN usuario, UN usuario TIENE MUCHOS FACTURAS(M:1)////
db.user.hasMany(db.factura,{
  foreignKey: { name:'idUsuario', allowNull: false }
});
db.factura.belongsTo(db.user,{
  foreignKey: { name:'idUsuario', allowNull: false }
});
//// UNA factura PERTENECE A UNA venta, UNA venta TIENE UNA factura 1:1 ////
db.venta.hasOne(db.factura,{
  foreignKey: {
    name: 'idVenta', allowNull: false 
  }
});
db.factura.belongsTo(db.venta,{
  foreignKey: {
    name: 'idVenta', allowNull: false 
  }
});
//una factura tiene un talonario , un talonario tiene muchas facturas
//REVISAR ESTA RELACION
db.talonario.hasMany(db.factura,{
  foreignKey: { name:'idTalonario', allowNull: false }
});
db.factura.belongsTo(db.talonario,{
  foreignKey: { name:'idTalonario', allowNull: false }
});
////////////////////////////////////////////

module.exports = db;