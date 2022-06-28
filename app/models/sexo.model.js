module.exports = (sequelize, Sequelize) => {
    const Sexo = sequelize.define("sexo", {
      Sexo: {
        type: Sequelize.STRING,
        allowNull: false // no permite valores nulos
      },
      sexo: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
    return Sexo;
  };
  