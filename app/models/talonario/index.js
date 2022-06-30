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

db.talonario = require("../../models/talonario.model.js")(sequelize, Sequelize);
db.factura = require("../../models/factura.model.js")(sequelize, Sequelize);
/////// RELACIÓN DE UNO A MUCHOS /////////
//// UNA FACTURA TIENE UN TALONARIO, UN TALONARIO TIENE MUCHAS FACTURAS////
db.talonario.hasMany(db.factura,{
    foreignKey: { name:'idTalonario', allowNull: false }
});
  db.factura.belongsTo(db.talonario,{
    foreignKey: { name:'idTalonario', allowNull: false }
});

module.exports = db;