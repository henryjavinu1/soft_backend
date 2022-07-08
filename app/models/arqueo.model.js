module.exports =(sequelize, Sequelize) => {
    const Arqueo = sequelize.define("arqueos", {
        fechaInicio: {//fecha de inicio el turno
            type: Sequelize.DATE,
            allowNull: false
        },
        fechaFinal: {//fecha de final el turno
            type: Sequelize.DATE,
            allowNull: true
        },
        efectivoApertura: {//dinero en caja para dar cambio al inicio del turno
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        efectivoCierre: {//dinero en efectivo que tiene que haber en caja al final del turno
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        otrosPagos: { //pagos realizados con tarjetas de credito o debito
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        ventaCredito: {//factuaras que se pagaran con credito en determinado tiempo
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        ventaTotal: {//la suma de todas las ventas
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        efectivoTotal: {//la suma del efectivoApertura + efectivoCierre
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