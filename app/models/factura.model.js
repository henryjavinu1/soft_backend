module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
      idFactura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numeroFactura: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      fechaFactura: {
        type: Sequelize.DATE,
        allowNull: false
      },
      descuentoTotalFactura: {
        type : Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      isvTotalFactura: {
        type : Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      totalFactura: {
        type : Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      subTotalFactura: {
        type : Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      cantidadLetras: {
        type : Sequelize.STRING,
        allowNull: true
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  
    return Factura;
  };