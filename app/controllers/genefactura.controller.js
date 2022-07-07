const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { venta, talonario, tipopago, detalleventa, numero } = require("../models/puntoDeVentas");
const detalleventaModel = require("../models/detalleventa.model");
const User = db.user;
const Role = db.role;
const Sesion = db.sesion;
const Factura = db.factura;
const cliente = db.cliente;
const TipoPago = db.tipopago;
const Numero = db.numero;
const Venta = db.venta;
const Op = db.Sequelize.Op;
//crear funcion para generar factura //Inserta datos en factura desde el cuerpo de la factura
//Pensar como unir findVentaDetalle con insertFactura
exports.insertFactura = async (req, res) => {
    console.log(req.body.numfactura);
    try {
        const numero = await db.numero.findOne({ order: [["numero", "DESC"]], });
        //SoloPara ejemplo no funcionan porque no existen los atributos en modelo ventas
        const isvTotal = await db.detalleventa.sum('isvAplicado'); //Falta agg estos atributos en el modelo detalleVenta
        const descuentoVentas = await db.detalleventa.sum('descuentoAplicado'); //Falta agg atributos en modelo
         //Subtotal + isv - descuento
        const totalFacturaa = await db.detalleventa.sum('totalDetalleVenta');
        //Falta conectar bien ventas para generar calculos dependiendo de los atributos de ventas
        const insertfactura = await db.factura.create({
                numeroFactura: numero.numero,
                fechaFactura: new Date(),
                descuentoTotalFactura: descuentoVentas,
                isvTotalFactura: isvTotal,
                totalFactura: totalFacturaa,
                //Subtotal exonerado o excento
                subTotalFactura: req.body.subTotalFactura,
                cantidadLetras: req.body.cantidadLetras, //necesito una funcion para generar cantidad de letras
                estado: true,
                idTipoPago: req.body.idTipoPago,
                idCliente: req.body.idCliente,
                idUsuario: req.body.userId,
                idVenta: req.body.idVenta,
                idTalonario: numero.idTalonario,
                idNumero: numero.id,
        });
        return res.status(200).send({
            message: "Factura creada",
            factura: factura
        });
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
//Buscar maximo en una tabla en un atributo especifico apoyp
exports.buscar = async (req, res) => {
   // const numero1 = await db.factura.max('numeroFactura');
    //const numero2 = await db.numero.max('numero');
    //const idDelTalonario = await db.numero.max('idTalonario');
    const numero = await db.numero.findOne({
        order: [["numero", "DESC"]],
    });

    return res.status(200).send({
        numero: numero.numero,
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
exports.convertirString = async (req, res) => {
        const talonario = await db.talonario.findOne({
            where: {
                active: true,
                isDelete: false,
                //Fecha sea mayor a la de hoy
                fechaLimiteEmision: {
                    [Op.gt]: new Date()
                }
            },
        });
        if (!talonario) {
            return res.status(404).send({
                message: "No hay talonarios activos"
            });
        } else {
            //redirigir venta de generar venta
            const idDelTalonario = await db.numero.max('idTalonario');
            const numero = await db.numero.max('correlativo');
            if ( numero == null) {
                message: "No hay facturas"
                const numeroFactura = await talonario.rangoInicialFactura;
                var pEmision = '001';	
                //Ingresar por defecto o manualmente... Solo colocar req.body.numero o lo que
                const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: '01', 
                tipo: '001', correlativo: numeroFactura, 
                //concatenar puntoEmision , establecimiento , tipo y correlativo
                numero: pEmision+'-' + '01' +'-'+ '001'+'-' + numeroFactura,
                idTalonario: talonario.idTalonario });
                return res.status(200).send({
                    numeroFactura: numeroFactura,
                    hola: "se inserto",
                    insert: insert,
                });
            } else {
                const idDelTalonario = await db.numero.max('idTalonario');
                if( talonario.idTalonario  == idDelTalonario){
                    //const numero = req.body.numero;
                    const numeroFa = parseInt(numero);
                    const num = numeroFa + 1;
                    //ver si num es MENOR que 10
                    if (num < 10) {
                        const numeroFactura = "0000000" + num;
                        const insert = await db.numero.create({ puntoEmision: '001', establecimiento: '01', 
                        tipo: '001', correlativo: numeroFactura,  numero: '001'+'-' + '01' +'-'+ '001'+'-' + numeroFactura,
                        idTalonario: talonario.idTalonario });
                        return res.status(200).send(numeroFactura)
                    }else{

                        var numeroString = num.toString();
                        for(var i =numeroString.length; i<8; i++){
                            numeroString = "0" + numeroString;
                        }
                        numeroFactura = numeroString;
                        const insert = await db.numero.create({ puntoEmision: '001', establecimiento: '01', tipo: '001', correlativo: numeroFactura, numero: '001'+'-' + '01' +'-'+ '001'+'-' + numeroFactura,idTalonario: talonario.idTalonario });
                        return res.status(200).send(numeroFactura);
}
            } else {
                message: "hi"
                const numeroFactura = await talonario.rangoInicialFactura;
                //Ingresar por defecto o manualmente... Solo colocar req.body.numero o lo que
                const insert = await db.numero.create({ puntoEmision: '001', establecimiento: '01', 
                tipo: '001', correlativo: numeroFactura, 
                //concatenar puntoEmision , establecimiento , tipo y correlativo
                numero: '001'+'-' + '01' +'-'+ '001'+'-' + numeroFactura,
                idTalonario: talonario.idTalonario });
                return res.status(200).send({
                    numeroFactura: numeroFactura,
                    hola: "se inserto",
                    insert: insert,
                });
                
            }
        }  }   
    } 
 
                
