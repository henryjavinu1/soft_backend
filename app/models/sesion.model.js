module.exports = (sequelize, Sequelize) => {
    const Sesion = sequelize.define("sesiones", {
      fecha:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  
    return Sesion;
  };