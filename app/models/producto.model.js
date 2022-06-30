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
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Producto;
  };
  