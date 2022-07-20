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
db.arqueo = require("../../models/arqueo.model.js")(sequelize, Sequelize);
db.ventas = require("../../models/ventas.model.js")(sequelize, Sequelize);
db.producto = require("../../models/producto.model.js")(sequelize, Sequelize);
db.cliente = require("../../models/cliente.model.js")(sequelize, Sequelize);
db.detalleventa = require("../detalleventa.model.js")(sequelize, Sequelize);
db.factura = require("../../models/factura.model.js")(sequelize, Sequelize);
db.talonario = require("../../models/talonario.model.js")(sequelize, Sequelize);
db.tipopago = require("../../models/tipopago.model.js")(sequelize, Sequelize);
db.tipoproducto = require("../../models/tipoproducto.model.js")(sequelize, Sequelize);
db.numero = require("../../models/numerosFactura.model.js")(sequelize, Sequelize);
db.roles_permisos = require("../../models/rolpermiso.model")(sequelize, Sequelize);
///////////////////////////////index.user.js//////////////////////////////
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
    through: db.roles_permisos,
    foreignKey: "idRol",
    otherKey: "idPermiso"
  });
  db.role.belongsToMany(db.permiso, {
    through: db.roles_permisos,
    foreignKey: "idRol",
    otherKey: "idPermiso"
  });
//////////////////index.arqueo.js////////////////////////
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UN ARQUEO TIENE UN USUARIO, UN USUARIO TIENE MUCHOS ARQUEO ////
  db.user.hasMany(db.arqueo, {
    foreignKey: { name: "idUsuario", allowNull: false },
  });
  db.arqueo.belongsTo(db.user, {
    foreignKey: { name: "idUsuario", allowNull: false },
  });
  ////////////////////////////////////////////
  /////// RELACIÓN DE UNO A UNO /////////
  //// UN ARQUEO TIENE UNA SESION, UN SESION TIENE UN ARQUEO ////
  db.sesion.hasOne(db.arqueo, {
    foreignKey: { name: "idSesion", allowNull: false },
  });
  db.arqueo.belongsTo(db.sesion, {
    foreignKey: { name: "idSesion", allowNull: false },
  });
  /////////////////index.generarfactura.js/////////////////////////////
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
  //  UN EMPLEADO TIENE VARIAS FACTURAS //
  db.empleado.hasMany(db.factura,{
    foreignKey: {name: 'idEmpleado', allowNull: false}
  });
  db.factura.belongsTo(db.empleado,{
    foreignKey: {name: 'idEmpleado', allowNull: false}
  });
  //// UNA factura PERTENECE A UNA venta, UNA venta TIENE UNA factura 1:1 ////
  db.ventas.hasOne(db.factura,{
    foreignKey: {
      name: 'idVenta', allowNull: false 
    }
  });
  db.factura.belongsTo(db.ventas,{
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
  //una factura tiene una sesion  , una sesion tiene muchas facturas
  //REVISAR ESTA RELACION
  db.sesion.hasMany(db.factura,{
    foreignKey: { name:'idSesion', allowNull: false }
  });
  db.factura.belongsTo(db.sesion,{
    foreignKey: { name:'idSesion', allowNull: false }
  });
///////////////////index.producto.js///////////////////////////////
////////// Relacion de 1 a 1 ////////////////////
// El produto tiene un tipo de producto//////////
  db.tipoproducto.hasOne(db.producto, {
    foreignKey: { name: "idTipoProducto", allowNull: false },
  });
  db.producto.belongsTo(db.tipoproducto, {
    foreignKey: { name: "idTipoProducto", allowNull: false },
  });
////////////////////index.ventas.js///////////////////////////////
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
  db.cliente.hasMany(db.ventas, {
    foreignKey: { name: 'idCliente', allowNull: false }
  });
  db.ventas.belongsTo(db.cliente, {
    foreignKey: { name: 'idCliente', allowNull: false }
    });
  
  
////////////relaciones de detalle venta////////////
//////////////////////////////////////
//////de uno a muchos ///////
/// 1 venta pertenece a muchos detalles ventas, un detalle venta pertenece a 1 venta
  db.ventas.hasMany(db.detalleventa, {
    foreignKey: { name: 'idVentas', allowNull: false }
  });
  db.detalleventa.belongsTo(db.ventas, {
    foreignKey: { name: 'idVentas', allowNull: false }
  });
  
/////////////////////////////////////
//////de uno a muchos ///////
/// 1 producto pertenece a muchos detalle_venta, un detalle_venta tiene un producto
  db.producto.hasMany(db.detalleventa, {
    foreignKey: { name: 'idProducto', allowNull: false }
  });
  db.detalleventa.belongsTo(db.producto, {
    foreignKey: { name: 'idProducto', allowNull: false }
  });
  ////////////////////////////////////////////
  //UN numero TIENE UN talonaro, UN talonario TIENE MUCHOS numero(1:N)
  //REVISAR ESTA RELACION
  db.talonario.hasMany(db.numero,{
    foreignKey: { name:'idTalonario', allowNull: false }
  });
  db.numero.belongsTo(db.talonario,{
    foreignKey: { name:'idTalonario', allowNull: false }
  });
// Factura-Numero
//una factuta tiene un numero, un numero tiene una factura
  db.numero.hasOne(db.factura,{
    foreignKey: {  name: 'idNumero', allowNull: false }
  });
  db.factura.belongsTo(db.numero,{
    foreignKey: {  name: 'idNumero', allowNull: false }
  });
module.exports = db;


