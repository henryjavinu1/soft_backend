module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("ventas", {
        totalISV: { // es el total calculado del ISV de todos los productos
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
          //  defaultValue : 0,
        },
        totalVenta: { /// es el total a pagar de toda la factura incluye SUBTOTAl+ISB-DES
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
          //  defaultValue : 0,
        },
        totalDescuentoVenta: { // la suma de de todos los descuentos aplicados por producto
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
     //       defaultValue : 0,
        },
        
        isDelete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,  //no permite valores nulos
            defaultValue: false //establece el valor por defecto en false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,  //no permite valores nulos
            defaultValue: false //establece el valor por defecto en false
        },
        puntoDeEmision: {       //donde se esta emitiendo
            type: Sequelize.STRING,
        //    defaultValue : 0,
          //  allowNull: false,
        },
        establecimiento: {  //establecimiento en que se genera la venta
            type: Sequelize.STRING,
       //     defaultValue : 0,
        //    allowNull: false, 
        },
        tipo: {         //tipo de documento que se va a generar por esa venta
            type: Sequelize.STRING,
            allowNull: false,
         //   defaultValue : 0,
        } 
    });
    return Venta;
};
