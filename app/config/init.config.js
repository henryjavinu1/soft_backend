const db = require("../models/puntoDeVentas");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Permiso = db.permiso;
const TipoPag = db.tipopago;


exports.initial = async () => {
    try {
        const existeRol = await Role.count();
        if (existeRol !== 0) {
            return  existeRol;
        }

        const role = await Role.create({
            id: 1,
            rol: "root",
            descripcion: "super usuario",
        });
        const permisos = await Permiso.bulkCreate([{
            permiso: "Modulo de Ventas",
            descripcion: "Acceder al modulo de Ventas"
        },{
            permiso: "Facturas",
            descripcion: "Acceder al modulo Facturas"
        }]);
        await role.addPermisos(permisos[0]);
        await role.addPermisos(permisos[1]);
        Empleado.create({
            id: 1,
            nombre: "root",
            apellido: "root",
            sexo: "M",
        });
        User.create({
            usuario: "root",
            password: bcrypt.hashSync(config.secret, 8),
            email: "root@soft.com",
            idEmpleado: 1,
            idRol: 1
        });
        //tipo de pago WJOE1995
        TipoPag.create({
            idTipoPago: 1,
            tipoDePago: "Efectivo",
            descripcionTipoPago: "Pago en efectivo",
        });
        TipoPag.create({
            idTipoPago: 2,
            tipoDePago: "Tarjeta Credito/Debito",
            descripcionTipoPago: "Pago con tarjeta de credito/debito",
        });
        TipoPag.create({
            idTipoPago: 3,
            tipoDePago: "Credito",
            descripcionTipoPago: "Factura que sera pagada en determinado tiempo",
        });
        TipoPag.create({
            idTipoPago: 4,
            tipoDePago: "Contado",
            descripcionTipoPago: "Factura que sera pagada al momento de la venta",
        });
 

        /*numero.create({ puntoEmision: '001', establecimiento: '01', tipo: '001', 
    correlativo: numeroFactura, numero: '001-'+ correlativo ,idTalonario: talonario.idTalonario });*/
    } catch (error) {
        console.log(error);
    }
    

};