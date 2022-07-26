module.exports = (sequelize, Sequelize) => {
    const ImagenProducto = sequelize.define("image", {
      image: {
        type: Sequelize.STRING,
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

    });
    return ImagenProducto;
  };
  