module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
      codigoProducto: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      nombreProducto: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      precioProducto: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cantidadProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isvProducto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descProducto: { /// se define en porcentaje 0 -> 0%
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      isExcento: { // falso para los productos que pagan ISV, true NO pagan ISV
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Producto;
  };
  