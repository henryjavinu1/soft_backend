module.exports =(sequelize, Sequelize) => {
    const Arqueo = sequelize.define("arqueos", {
        fechaInicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fechaFinal: {
            type: Sequelize.DATE,
            allowNull: true
        },
        efectivoApertura: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        efectivoCierre: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        otrosPagos: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        ventaCredito: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        ventaTotal: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        efectivoTotal: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    return Arqueo;
  };