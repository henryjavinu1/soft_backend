module.exports = (sequelize, Sequelize) => {
  const roles_permisos = sequelize.define("roles_permisos", {
      idRol: {
          type: Sequelize.STRING,

      },
      idPermiso: {
          type: Sequelize.STRING,
      }
  });
  return roles_permisos;
};
