const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
      idFactura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numeroFactura: { /// numero que se asigna del talonario
        type: Sequelize.STRING,
        allowNull: false 
      },
      fechaFactura: {
        type: DataTypes.DATEONLY,
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
      subTotalExonerado: {
        type : Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      subTotalFactura: { // Imprimir en la pantalla el subtotal y ponerle excento o exonerado 
        type : Sequelize.DECIMAL(10,2),//expresar cantidad de dinero
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