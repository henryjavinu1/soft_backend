const db = require("../models/generarfactura");
const funciones = require("../config/funciones.js");
const config = require("../config/auth.config");
const { venta, talonario, tipopago } = require("../models/generarfactura");
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
        //ver si un usuario tiene permisos para realizar esta accion
        const user = await User.findOne({
            where: {
                id: req.userId,
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
        }
        const permiso = user.roles[0].permisos.find(p => p.id == 1);
        if (!permiso) {
            return res.status(401).send({
                message: "No tienes permiso para realizar esta accion"
            });
        }
        //Buscar numero de talonario y numero de factura
        const talonario = await talonario.findOne({ where: { 
            isDelete: false,
            estado: true,
         } ,

            
        });
        //Fecha actual
        const hoy = new Date();
        const dia = hoy.getDate();
        const mes = hoy.getMonth() + 1;
        const anio = hoy.getFullYear();
        dia = ('0' + dia).slice(-2);
        mes = ('0' + mes).slice(-2);
        const fechaa = anio + "/" + mes + "/" + dia;
        //Crear nueva factura, Ingresar datos
        const factura = await factura.create({
            numerofactura: req.body.numerofactura, //necesito una función que me genere el numero de factura automaticamente
            fechafactura: fechaa, //necesito una funcion para generar fecha del dia
            descuentototalfactura: req.body.descuentototalfactura,
            isvtotalfactura: req.body.isvtotalfactura,
            totalfactura: req.body.totalfactura,
            subtotalfactura: req.body.subtotalfactura,
            cantidadletras: req.body.cantidadletras, //necesito una funcion para generar cantidad de letras
            idCliente: cliente.idCliente,
            idVenta: venta.idVenta,
            idUser: user.idUser,
            idTalonario: talonario.idTalonario,
            idTipoPago: tipopago.idTipoPago,
            isDelete: false,
            estado: true,
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
              }]
        });
        return res.status(200).send({
            message: "Factura creada"
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}
//Buscar venta por id
exports.findVenta = async (req, res) => {
    try {
       //ver si un usuario tiene permisos para realizar esta accion
        const user = await User.findOne({
            where: {
                id: req.userId,
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
        }
        const permiso = user.roles[0].permisos.find(p => p.id == 1);
        if (!permiso) {
            return res.status(401).send({
                message: "No tienes permiso para realizar esta accion"
            });
        }
        //Buscar idVenta o insertar un numero de venta en tabla venta
        const venta = await venta.findAll({
            where: {
                idVent: req.params.id,
                isDelete: false,
            },
            include: [{
                model: db.detalleventa,
            }]
        });
        if (!venta) {
            return res.status(404).send({
                message: "La venta no existe"
            });
        }
        return res.status(200).send({
            detalleventa,
            Venta
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}
