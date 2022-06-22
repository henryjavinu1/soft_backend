module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuarios", {
    usuario: {
      type: Sequelize.STRING,
      allowNull: false // no permite valores nulos
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false // no permite valores nulos
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // no permite valores nulos
      unique: true //  permite un solo email, no permite email duplicados
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      allowNull: false, // no permite valores nulos
      defaultValue: false // establece el valor por defecto en false
    }
  });
  return Usuario;
};
