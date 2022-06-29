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

db.factura = require("../../models/factura.model.js")(sequelize, Sequelize);
db.tipopago = require("../../models/tipopago.model.js")(sequelize, Sequelize);
db.cliente = require("../../models/cliente.model.js")(sequelize, Sequelize);
db.user = require("../../models/user.model.js")(sequelize, Sequelize);
db.venta = require("../../models/ventas.model.js")(sequelize, Sequelize);

// Tipo pago 
db.tipopago.hasMany(db.factura,{
  foreignKey: { name:'idTipoPago', allowNull: false }
});
db.factura.belongsTo(db.tipopago,{
  foreignKey: { name:'idTipoPago', allowNull: false }
});


// Cliente
db.cliente.hasMany(db.factura,{
  foreignKey: { name:'idCliente', allowNull: false }
});
db.factura.belongsTo(db.cliente,{
  foreignKey: { name:'idCliente', allowNull: false }
});

// Usuario
db.user.hasMany(db.factura,{
  foreignKey: { name:'idUsuario', allowNull: false }
});
db.factura.belongsTo(db.user,{
  foreignKey: { name:'idUsuario', allowNull: false }
});

// Venta
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


module.exports = db;