module.exports = (sequelize, Sequelize) => {
    const Permiso = sequelize.define("permisos", {
      permiso: {
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
    return Permiso;
  };
  