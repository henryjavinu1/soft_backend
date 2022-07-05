const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { venta, talonario, tipopago, detalleventa } = require("../models/puntoDeVentas");
const detalleventaModel = require("../models/detalleventa.model");
const User = db.user;
const Role = db.role;
const Sesion = db.sesion;
const Factura = db.factura;
const cliente = db.cliente;
const TipoPago = db.tipopago;
const Venta = db.venta;
const Op = db.Sequelize.Op;
//crear funcion para generar factura //Inserta datos en factura desde el cuerpo de la factura
exports.insertFactura = async (req, res) => {
    console.log(req.body.numfactura);
    try {
        //ver si un usuario 
        const user = await User.findOne({
            where: {
                id: req.body.userId,
                isDelete: false
            },
            include: [{
                model: db.role,
                include: [{
                    model: db.permiso,
                }]
            }]
        });
        if (!user) {
            return res.status(404).send({
                message: "El usuario no existe"
            });
        }else{
            const facturaa = await db.factura.create({
                numeroFactura: req.body.numeroFactura, //necesito una función que me genere el numero de factura automaticamente
                fechaFactura: req.body.fechaFactura, //necesito una funcion para generar fecha del dia
                descuenTototalFactura: req.body.descuentoTotalFactura,
                isvTotalFactura: req.body.isvTotalFactura,
                totalFactura: req.body.totalFactura,
                subtotalFactura: req.body.subTotalFactura,
                cantidadLetras: req.body.cantidadLetras, //necesito una funcion para generar cantidad de letras
                estado: true,
                idTipoPago: req.body.idTipoPago,
                idCliente: req.body.idCliente,
                idUsuario: req.body.userId,
                idVenta: req.body.idVenta,
                idTalonario: req.body.idTalonario,
        });
        return res.status(200).send({
            message: "Factura creada"
        });}
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar una venta por el id
exports.findVentaDetalle = async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
              id: req.body.idUsuario,
              isDelete: false
            },
            include: [{
              model: db.role,
              include: [{
                model: db.permiso,
              }]
            }, {
              model: db.empleado,
            }, {
              model: db.sesion,
            }]
          });
      
          if (!user) {
            return res.status(404).send({
              message: "User Not found."
            });
            } else {
                const venta = await db.venta.findOne({
                    where: {
                        idVenta: req.body.idVent,
                        isDelete: false
                    }, 
                    include: [ {
                        model: db.cliente,
                    }, {
                        model: db.detalleventa,
                        
                    }]
                });
                if (!venta) {
                    return res.status(404).send({
                        message: "La venta no existe"
                    });
                } else {
                    const detalleventa = await db.detalleventa.findAll({
                        where: {
                            idVenta: req.body.idVent,
                            isDelete: false
                        }}); if (!detalleventa) {
                            return res.status(404).send({
                                message: "Los detallesventa no existe"
                            });
                        } else {
                           
                                    return res.status(200).send({
                                        message: "La venta Existe",
                                        empleado: user.empleado,
                                        nombrecliente: venta.nombreCliente,
                                        idCliente: venta.idCliente, //Crear una funcion de busqueda cliente
                                        idVenta: venta.idVent,
                                        isvventa: venta.isvVenta,
                                        totalfacturaventa: venta.totalFacturaVenta,
                                        descuentoaplicadoventa: venta.descuentoAplicadoVenta,
                                        detalleventa: detalleventa,
                                });
                        
                     
                 }
               // return res.status(200).send({
                   // message: "User found.",
                   // usuario: user.usuario });
                }   } 
           

    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar una talonario por activo //Obtiene numero de la factura segun los rangos del talonario 
//y el numero de factura anterior
exports.findTalonarioFactura = async (req, res) => {
    try {
        const talonario = await db.talonario.findOne({
            where: {
                active: true,
                isDelete: false,
            },
        });
        if (!talonario) {
            return res.status(404).send({
                message: "El talonario no existe"
            });
        } else {

            const numeroFinal = await db.factura.max('numeroFactura');
            if ( numeroFinal == null) {
                message: "No hay facturas"
                const numeroFactura = await talonario.rangoInicialFactura;
                return res.status(500).send({
                    numeroFactura: numeroFactura,
                });
            } else {
                const numeroFactura = await numeroFinal + 1;
                if (numeroFactura > talonario.rangoFinalFactura) {
                    return res.status(400).send({
                        message: "No hay mas numeros de factura disponibles"
                    });
                }else { 
                return res.status(500).send({
                    message: "El numero de factura es",
                    numeroFactura: numeroFactura,
            });
            } 
            //return res.status(500).send({
               // numeroFactura: numeroFactura,
           // });  
        } 
            
            } } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}  
//Buscar tipo de pago 
exports.findTipoPago = async (req, res) => {
    try {
        const tipopago = await db.tipopago.findAll({
            where: {
                isDelete: false,
            }
        });
        if (!tipopago) {
            return res.status(404).send({
                message: "El tipo de pago no existe"
            });
        } else {
            return res.status(200).send({
                message: "El tipo de pago existe",
                tipoDePago: tipopago
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar maximo en una tabla en un atributo especifico
exports.buscar = async (req, res) => {
    const numero = await db.factura.max('numeroFactura');
    
    return res.status(200).send({
        numero: numero,
    });
}
//Ejemplo traer datos de una tabla pero solo los de un atributo
exports.facturasdisponibles = async (req, res) => {
    const facturas = await db.factura.findAll({ 
        attributes: ['numeroFactura']
    });

    return res.status(200).send({
        facturas: facturas,
    });
} 