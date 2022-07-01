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


db.role = require("../role.model.js")(sequelize, Sequelize);
db.permiso = require("../permiso.model.js")(sequelize, Sequelize);
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

module.exports = db;
