const db = require("../models/generarfactura");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Permiso = db.permiso;


exports.initial = async () => {
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
    })

}