module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false 
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  return Rol;
};