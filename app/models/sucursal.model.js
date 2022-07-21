module.exports = (sequelize, Sequelize) => {
    const Sucural = sequelize.define("sucursales", {
        idSucursal: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreSucursal: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
        lemaSucursal: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
    });

    return Sucural;
};