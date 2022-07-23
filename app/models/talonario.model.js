module.exports = (sequelize, Sequelize) => {
    const Talonario = sequelize.define("talonarios", {
        idTalonario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rangoInicialFactura: {
            type: Sequelize.STRING,
            unique:true
        },
        idSucursal: {
            type: Sequelize.INTEGER,
        },
        rangoFinalFactura: {
            type: Sequelize.STRING,
            unique:true
        },
        cai: {
            type: Sequelize.STRING,
        },
        fechaLimiteEmision: {
            type: Sequelize.DATE,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Talonario;
};
