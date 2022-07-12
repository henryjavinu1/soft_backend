module.exports = (sequelize, Sequelize) => {
    const TipoProducto = sequelize.define("tipoproducto", {
      tipoProducto: {
        type: Sequelize.STRING,
        unique: true, //  no permite que se dupliquen nombres de tipos de productos
        allowNull: false // no permite valores nulos
      },
      descripcionProducto: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos
      },
      isvTipoProducto: {
        type: Sequelize.DECIMAL,
        allowNull: false, // no permite valores nulos
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // no permite valores nulos
        defaultValue: false // establece el valor por defecto en false
      }
    });
    return TipoProducto;
  };
  