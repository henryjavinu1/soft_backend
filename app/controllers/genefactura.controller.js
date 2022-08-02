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
const path = require('path');
const fs = require('fs');
//Funcion para insertar una nueva factura
//El controlador aun le falta lo de los subTotales porque no sabemos si vienen de venta o no
exports.insertFactura = async (req, res) => {
    //Primero pasamos el id de la venta a la tabla factura y verificamos que exista
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
            //Si la venta existe
        const id = ventas.id;
        //Llamamos al controlador nuevo que nos genera un nuevo numero de la factura
        await this.nuevo(req); 
        //Sesion por mientras modificamos los token 
         const sesion = await db.sesion.findOne({
            where: {
                isActive: true,
                isDelete: false
            }
        });
        //Datos extraidos de la venta
        const isvTotal = await ventas.totalISV; //ISV de la venta
        const descuentoVentas = await ventas.totalDescuentoVenta; // Descuento de la venta
        const totalventaa = await ventas.totalVenta; //Total de la venta
        const numero = await db.numero.findOne({ order: [["id", "DESC"]], }); //Buscamos el ultimo numero registrado anteriormente
       let ClaseConversor = conversor.conversorNumerosALetras; //Clase de la libreria conversor
       let miConversor = new ClaseConversor(); //Instancia de la clase
        const subTotalExoneradoo = 0.00;//Exonerado improvisado
        //Sub total sacamos esta cuenta de los datos de la venta
        const subTotal = parseFloat(isvTotal) + parseFloat(totalventaa) - parseFloat(descuentoVentas);
        // sacar el entero y el decimal de subTotal
        // Esta parte la hacemos porque la libreria de pasar la cantidad a letras no es capaz de cponvertir decimales
        const Entero = parseInt(isvTotal) + parseInt(totalventaa) - parseInt(descuentoVentas) - 1; //Entero de la cantidad
        const Decimal = subTotal - Entero;//Decimal de la cantidad
        const centavos = Decimal * 100; //Convertir decimal a entero
        var numeroLetrasEntero = miConversor.convertToText(Entero); //Convertir numero a letras
        var numeroLetrasDecimal = miConversor.convertToText(parseInt(centavos));//Convertir decimal a letras
        const Union = numeroLetrasEntero + " " + "LEMPIRAS " + " " + numeroLetrasDecimal + "CENTAVOS"; //concatenar entero y decimal en letras
        //Crear la factura
        const insertfactura = await db.factura.create({
                numeroFactura: numero.numero, 
                fechaFactura: new Date(),
                descuentoTotalFactura: descuentoVentas,
                isvTotalFactura: isvTotal,
                totalFactura: subTotal,
                subTotalExonerado: subTotalExoneradoo,
                //Subtotal exonerado o excento
                subTotalFactura: subTotal, //HACER QUE EL SUBTOTAL SEA EXONERADO o no desde el front 0 o float
                cantidadLetras: Union, //necesito una funcion para generar cantidad de letras
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
//Este controlador solo sirve de apoyo para hacer pruebas pequeñS
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
// El controlador nuevo es para generar un nuevo numero de la factura
exports.nuevo = async (req) => {
    //Verificar si el talonario esta activo,isDelete y fecha de emision
            const talonario = await db.talonario.findOne({
                where: {
                    active: true,
                    isDelete: false,
                    fechaLimiteEmision: {
                        [Op.gt]: new Date()
                    }
                },
            });
            //No existe talonario 
            if (!talonario) {
                return false;
                //Si existe talonario
            } else {
                const idDelTalonario = await db.numero.max('idTalonario');//Ultimo talonario registrado en la tabla Numero
                const numer = await db.numero.findOne({ order: [["id", "DESC"]], }); //Buscar numero por id
                const numero = numer.correlativo; //Obtener el correlativo del ultimo id de nuemro
                //Verificar la venta para obtener datos 
                const ventas = await db.ventas.findOne({
                        where: {
                            id: req.body.idVenta,
                            isDelete: false
                            },
                                    });
                //Si la venta no existe
                const pEmision = await ventas.puntoDeEmision;//Punto de emision de la venta
                const estableci = await ventas.establecimiento;//Establecimiento de la venta
                const tipoo = await ventas.tipo;// Tipo de la venta
                //Verificar si existe algun registro en la tabla numero
                if ( numero == null) { // si es nulo hacer la primera insercion
                    message: "No hay facturas"
                    const numeroFactura = await talonario.rangoInicialFactura; //El correlativo sera igual al rango inicial porq no hay otro registro en la tabla numero
                    //Insertar nuevo registro en tabla numero
                    const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                    tipo: tipoo, correlativo: numeroFactura, 
                    //concatenar puntoEmision , establecimiento , tipo y correlativo
                    numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                    idTalonario: talonario.idTalonario });
                    return true;
                   
                } else { //Si ya existen registros en la tabla numero
                    const idDelTalonario = await db.numero.max('idTalonario');// Extraer el id del ultimo talonario registrado en la tabla numero
                    //Verificar que ese idDelTalonario sea el mismo que el idTalonario activo que verificamos arriba
                    if( talonario.idTalonario  == idDelTalonario){                     //const numero = req.body.numero;
                        const numeroFa = parseInt(numero); //Convertir el numero de string a int
                        const num = numeroFa + 1; //sumarle 1 al numero
                        if (num <= talonario.rangoFinalFactura) { //verificar que este dentro del rango final
                                      var numeroString = num.toString(); //Convertir el numero a string
                                      for(var i =numeroString.length; i<8; i++){ //Agregar ceros a la izquierda
                                          numeroString = "0" + numeroString;
                                      }
                                      numeroFactura = numeroString; //Correlativo generado
                                      //Insertar nuevo registro en tabla numero con el correlativo generado
                                      const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                                          tipo: tipoo, correlativo: numeroFactura, 
                                          numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                                          idTalonario: talonario.idTalonario });                        
                                          return true;
                        } else { // sino de la parte de verificar el rango final del talonario
                            return false;
                        }
                } else {// sino de la parte de la comparacion del talonario si no es el mismo talonario
                    //  debe hacer una nueva insercion en la tabla numero tomando el rango inicial del talonario activo
                    const numeroFactura = await talonario.rangoInicialFactura;
                    const insert = await db.numero.create({ puntoEmision: pEmision, establecimiento: estableci, 
                        tipo: tipoo, correlativo: numeroFactura, 
                        //concatenar puntoEmision , establecimiento , tipo y correlativo
                        numero: pEmision +'-' + estableci  +'-'+  tipoo +'-' + numeroFactura,
                        idTalonario: talonario.idTalonario });
                   return true;
                    
                }
            }  }   
        } 
