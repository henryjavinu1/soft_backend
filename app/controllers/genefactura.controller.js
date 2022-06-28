const db = require("../models/generarfactura");
const config = require("../config/auth.config");
const { venta, talonario, tipopago, detalleventa } = require("../models/generarfactura");
const detalleventaModel = require("../models/detalleventa.model");
const User = db.user;
const Role = db.role;
const Sesion = db.sesion;
const Factura = db.factura;
const cliente = db.cliente;
const TipoPago = db.tipopago;
const Venta = db.venta;
const Op = db.Sequelize.Op;
//crear funcion para generar factura
exports.insertFactura = async (req, res) => {
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
            const factura = await factura.create({
                where: {
                    idventa: venta.idVenta
                },
                include: [{
                    model: db.venta,
                        include: [{
                        model: db.cliente,
                    },
                    ]}, {
                    model: db.user,
                }, {
                 model: db.talonario,
                }, {
                    model: db.tipopago,
                }],
                numerofactura: req.body.numeroFactura, //necesito una función que me genere el numero de factura automaticamente
                fechafactura: req.body.fechaFactura, //necesito una funcion para generar fecha del dia
                descuentototalfactura: req.body.descuentoTotalFactura,
                isvtotalfactura: req.body.isvTotalFactura,
                totalfactura: req.body.totalFactura,
                subtotalfactura: req.body.subTotalFactura,
                cantidadletras: req.body.cantidadLetras, //necesito una funcion para generar cantidad de letras
                estado: true,
                idTipoPago: req.body.idTipoPago,
                idCliente: req.body.idCliente,
                idUser: req.body.idUser,
                idVenta: req.body.idVenta,
                idTalonario: req.body.idTalonario,
              
        });
        return res.status(200).send({
            message: "Factura creada"
        });}
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}
//Buscar una venta por el id
exports.findVenta = async (req, res) => {
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
                        id: req.body.idVent,
                        isDelete: false
                    }, 
                    include: [ {
                        model: db.cliente,
                    }, {
                        model: db.detalleventa,
                        include: [ { model:db.venta }]
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
                        idCliente: venta.idCliente,
                        idVenta: venta.id,
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
//Buscar una talonario por activo //Funcion esta mala falta obtener ultimoNumeroFactura
exports.findTalonario = async (req, res) => {
    try {
        const talonario = await db.talonario.findOne({
            //verificar que estado de talonario sea activo
            where: {
                active: true,
                isDelete: false,
            }
        });
        if (!talonario) {
            return res.status(404).send({
                message: "El talonario no existe"
            });
        } else {

                const numeroFinal = async () => {
                    if (ultimoIdFactura == null) {
                        const numeroFactura = talonario.rangoInicio;
                    } else {
                        //si el ultimo id de la tabla factura no es null, el numero de factura es el ultimo id de la tabla factura + 1 si es menor a rango final de talonario
                        const numeroFactura = ultimoIdFactura[0].id + 1;
                        if (numeroFactura > talonario.rangoFin) {
                            return res.status(400).send({
                                message: "No hay mas numeros de factura disponibles"
                            });
                        }  } 
                       
                    return numeroFactura;
                };
            
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar tipo de pago por tipo de pago
exports.findTipoPago = async (req, res) => {
    try {
        const tipopago = await tipopago.findOne({
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
                tipopago: tipopago
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}