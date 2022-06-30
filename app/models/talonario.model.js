module.exports = (sequelize, Sequelize) => {
const Talonario = sequelize.define("talonarios", {
    idTalonario: {
    type: Sequelize.INTEGER,
    primaryKey: true
    },
    rangoInicialFactura: {
    type: Sequelize.INTEGER,
    },
    rangoFinalFactura: {
    type: Sequelize.INTEGER,
    },
    cai: {
    type: Sequelize.STRING,
    },
    fechaLimiteEmision: {
    type: Sequelize.DATE,
    }
});

return Talonario;
};
