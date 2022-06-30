module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("ventas", {
        isvVentas: {
            type: Sequelize.DECIMAL,
        },
        totalFacturaVentas: {
            type: Sequelize.DECIMAL,
        },
        descuentoAplicadoVentas: {
            type: Sequelize.DECIMAL,
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,  //no permite valores nulos
            defaultValue: false //establece el valor por defecto en false
        }
    });
    return Venta;
};
