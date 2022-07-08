module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("ventas", {
        totalISV: { // es el total calculado del ISV de todos los productos
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        totalVenta: { /// es el total a pagar de toda la factura incluye SUBTOTAl+ISB-DES
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        totalDescuentoVenta: { // la suma de de todos los descuentos aplicados por producto
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,  //no permite valores nulos
            defaultValue: false //establece el valor por defecto en false
        }
    });
    return Venta;
};
