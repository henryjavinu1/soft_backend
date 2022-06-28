module.exports = (sequelize, Sequelize) => {
    const TipoPago = sequelize.define("tipopagos", {
      tipoDePago: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      descripcionTipoPago: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  
    return TipoPago;
  };