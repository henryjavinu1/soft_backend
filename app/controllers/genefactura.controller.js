const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { venta, talonario, tipopago, detalleventa, numero, user, empleado } = require("../models/puntoDeVentas");
const detalleventaModel = require("../models/detalleventa.model");
const talonarioModel = require("../models/talonario.model");
const User = db.user;
const Empleado = db.empleado;
const Role = db.role;
const Sesion = db.sesion;
const Factura = db.factura;
const Cliente = db.cliente;
const TipoPago = db.tipopago;
const Numero = db.numero;
const Venta = db.venta;
const DetalleVenta = db.detalleventa;
const Talonario = db.Talonario;
const Op = db.Sequelize.Op;

const conversor = require('conversor-numero-a-letras-es-ar');

const { request, response } = require('express');
const fs = require('fs');
const { construirFacturaEnPDF } = require('../helpers/manipularfactura.helper');
const path = require('path');
const Producto = db.producto;


//crear funcion para generar factura //Inserta datos en factura desde el cuerpo de la factura
//Pensar como unir findVentaDetalle con insertFactura

exports.insertFactura = async (req, res) => {
    try {
        const ventas = await db.ventas.findOne({
            where: {
                id: req.body.idVenta,
                isDelete: false
                },
                include: [ {
                    model: db.cliente,
                }, {
                    model: db.detalleventa,  
                }, {
                    model: db.user, 
                    include: [{
                        model: db.empleado,
                      }]  
                }, ]
            });   
        const id = ventas.id;
        await this.nuevo(req);  
         const sesion = await db.sesion.findOne({
            where: {
                isActive: true,
                isDelete: false
            }
        });
        const isvTotal = await ventas.totalISV;
        const descuentoVentas = await ventas.totalDescuentoVenta;
        const totalventaa = await ventas.totalVenta;
       
        const numero = await db.numero.findOne({ order: [["id", "DESC"]], });
        let ClaseConversor = conversor.conversorNumerosALetras;
        let miConversor = new ClaseConversor();
        const subTotalExoneradoo = 0.00;
        const subTotal = parseFloat(isvTotal) + parseFloat(totalventaa) - parseFloat(descuentoVentas);
        var numeroLetras = miConversor.convertToText(subTotal);
        const insertfactura = await db.factura.create({
                numeroFactura: numero.numero,
                fechaFactura: new Date(),
                descuentoTotalFactura: descuentoVentas,
                isvTotalFactura: isvTotal,
                totalFactura: subTotal,
                subTotalExonerado: subTotalExoneradoo,
                //Subtotal exonerado o excento
                subTotalFactura: subTotal, //HACER QUE EL SUBTOTAL SEA EXONERADO o no desde el front 0 o float
                cantidadLetras: numeroLetras, //necesito una funcion para generar cantidad de letras
                estado: true,
                idTipoPago: req.body.idTipoPago,
                idCliente: ventas.idCliente,
                idUsuario: ventas.idUsuario, // id de usuario que vende
                idEmpleado: ventas.usuario.empleado.id, // id de empleado que vende
                 //Usuario Sesion con la que se esta facturando
                idVenta: ventas.id,
                idTalonario: numero.idTalonario,
                idSesion: sesion.id,
                idNumero: numero.id,

                
        },
       
        );
        return res.status(200).send({
            insertfactura: insertfactura
        }
      );

     
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}
//Buscar una venta por el id de venta
exports.findVentaDetalle = async (req, res) => {
    try {
        const ventas = await db.ventas.findOne({
            where: {
                id: req.body.idVent,
                isDelete: false
                    }, 
                    include: [ {
                        model: db.cliente,
                    }, {
                        model: db.detalleventa,  
                    }, {
                        model: db.user, 
                        include: [{
                            model: db.empleado,
                          }]  
                    }]
                });
                if (!ventas) {
                    return res.status(404).send({
                        message: "La venta no existe"
                    });
                } else {
			        const detalleventa = await db.detalleventa.findAll({
                        	where: {
                            		idVentas: req.body.idVent,
                            		isDelete: false
                        	}}); 
                            if (!detalleventa) {
                            	return res.status(404).send({
                                message: "Los detallesventa no existe"
                            });
                            } else {
                                
                                return res.status(200).send({
                                //Como obtener datos especificos de un modelo
                                message: "La venta Existe",
                                usuario: ventas.usuario,
                                empleado: ventas.empleado,
                                cliente: ventas.cliente,
                                //nombrecliente: cliente.nombreCliente,
                                idCliente: ventas.idCliente, 
                                id: ventas.id,
                                totalVenta: ventas.totalVenta,
                                totalISV: ventas.totalISV,
                                totalDescuentoVenta: ventas.totalDescuentoVenta,
                                puntoDeEmision: ventas.puntoDeEmision,
                                establecimiento: ventas.establecimiento,
                                tipo: ventas.tipo,
                                detalleventa: detalleventa,
                                });           
                 } 
                }
    } catch (error) {
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
//Buscar maximo en una tabla en un atributo especifico apoyo
exports.buscar = async (req, res) => {
    const numero = await db.numero.max('correlativo');
    return res.status(200).send({
       numero: numero,

    });
}
//Ejemplo traer datos de una tabla pero solo los de un atributo appoyo
exports.facturasdisponibles = async (req, res) => {
    const facturas = await db.factura.findAll({ 
        attributes: ['numeroFactura']
    });

    return res.status(200).send({
        facturas: facturas,
    });
} 
//Funcion para generar correlativo de factura e inserta en la tabla numero
// Dependiendo rangos de talonarios, si esta activo o no y fecha limite
// Errores dato manuales solo hay que modificar req.body.numero dependiendo el caso
// Concatenar en la funcion de insertar
exports.nuevo = async (req) => {
            const talonario = await db.talonario.findOne({
                where: {
                    active: true,
                    isDelete: false,
                    fechaLimiteEmision: {
                        [Op.gt]: new Date()
                    }
                },
            });
            if (!talonario) {
                return false;
                
            } else {
                //redirigir venta de generar venta
                const idDelTalonario = await db.numero.max('idTalonario');
                const numer = await db.numero.findOne({ order: [["id", "DESC"]], });
                const numero = numer.correlativo;
                const ventas = await db.ventas.findOne({
                        where: {
                            id: req.body.idVenta,
                            isDelete: false
                            },
                                    });
                const pEmision = await ventas.puntoDeEmision;
                const estableci = await ventas.establecimiento;
                const tipoo = await ventas.tipo;
                if ( numero == null) {
                    message: "No hay facturas"
                    const numeroFactura = await talonario.rangoInicialFactura;
                    //Ingresar por defecto o manualmente... Solo colocar req.body.numero o lo que
                    const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                    tipo: tipoo, correlativo: numeroFactura, 
                    //concatenar puntoEmision , establecimiento , tipo y correlativo
                    numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                    idTalonario: talonario.idTalonario });
                    return true;
                   
                } else {
                    const idDelTalonario = await db.numero.max('idTalonario');
                    if( talonario.idTalonario  == idDelTalonario){                     //const numero = req.body.numero;
                        const numeroFa = parseInt(numero);
                        const num = numeroFa + 1;
                        if (num <= talonario.rangoFinalFactura) {
                                      var numeroString = num.toString();
                                      for(var i =numeroString.length; i<8; i++){
                                          numeroString = "0" + numeroString;
                                      }
                                      numeroFactura = numeroString;
                                      const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                                          tipo: tipoo, correlativo: numeroFactura, 
                                          numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                                          idTalonario: talonario.idTalonario });                        
                                          return true;
                        } else {
                            return false;
                        }
                } else {
                   
                    const numeroFactura = await talonario.rangoInicialFactura;
                    //Ingresar por defecto o manualmente... Solo colocar req.body.numero o lo que
                    const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                        tipo: tipoo, correlativo: numeroFactura, 
                        //concatenar puntoEmision , establecimiento , tipo y correlativo
                        numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                        idTalonario: talonario.idTalonario });
                   return true;
                    
                }
            }  }   
        } 

exports.descargarFactura = async (req, res) => {
            
            // console.log('num factura: '+numeroFactura);
            let detallesDeVentas = [];
            let facturaBuscada
            try {
                facturaBuscada = await Factura.findOne({
                    where: {
                         isDelete: false , 
                         numeroFactura: req.body.numeroFactura
                    },
                    include: [
                        {
                            model: Venta,
                        },
                        {
                            model: Empleado,
                        },
                        {
                            model: TipoPago,
                        },
                        {
                            model: Talonario,
                        },
                        {
                            model: Cliente,
                        }
                    ]
                });
                if (facturaBuscada.venta) {
                    detallesDeVentas = await DetalleVenta.findAll({
                        where: { isDelete: false, idVentas: facturaBuscada.venta.id },
                        include: [
                            {
                                model: Producto
                            }
                        ]
                    });
                }
                if (facturaBuscada) {
                    construirFacturaEnPDF(facturaBuscada, detallesDeVentas).then(pdfDoc => {
                        var file = fs.createReadStream('./app/pdf_files/primera.pdf');
                        // var stat = fs.statSync('./app/pdf_files/primera.pdf');
                        // res.setHeader('Content-Length', stat.size);
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', `attachment; filename=factura${facturaBuscada.numeroFactura}.pdf`);
                        file.pipe(res);
                        // fs.unlinkSync('./app/pdf_files/primera.pdf');
                    }).catch(err => {
                        res.status(500).json(
                            {
                                msg: err
                            }
                        )
                    });
                } else {
                    return res.status(400).json({
                       msg: 'No se encontró el documento solicitado.' 
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    msg: 'Ocurrió un error al buscar el registro en la base de datos comuniquese con el administrador.'
                });
            }
        
        
            // return res.status(200).download(path.join(__dirname, '../pdf_files/prueba.pdf'));
        }
        