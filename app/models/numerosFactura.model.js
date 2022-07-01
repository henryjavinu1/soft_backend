module.exports = (sequelize, Sequelize) => {
    const Numero = sequelize.define("numerosFactura", {
      numero: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      puntoEmision: {
        type: Sequelize.STRING,
        allowNull: false
      },
      establecimiento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correlativo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Numero;
  };
  