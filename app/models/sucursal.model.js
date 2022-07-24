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
        direccion: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
        telefono: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
        rtn: {
            type: Sequelize.STRING,
            defaultValue: 'X'
        },
        logo: {
            type: Sequelize.STRING, // almacena una URL en donde se almacena la imagen
            defaultValue: 'X'
        },
    });

    return Sucural;
};