module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("clientes", {
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        rtn: {
            type: Sequelize.STRING,
            allowNull: true, // permite nulos
            unique: true 
        },
        nombreCliente:{
            type: Sequelize.STRING,
            allowNull: false, //no permite nulos
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false, //no permite nulos
        },
        telefonoCliente: {
            type: Sequelize.STRING,
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idSesion: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,  //no permite valores nulos
            defaultValue: false //establece el valor por defecto en false
        }
    });
    return Cliente;
};
