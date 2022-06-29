const db = require("../models/ventas");
const config = require("../config/auth.config");
const Ventas = db.ventas;
const DetalleVenta = db.detalle_venta;
const Role = db.role;
const User = db.user;
const Op = db.sequelize.Op;

exports.signup = async (req, res) => {
    try{
        const ventas = await Ventas.create({
            isvVentas: req.body.isvVentas,
            totalFacturaVentas: req.body.totalFacturaVentas, 
            descuentoAplicadoVentas: req.body.descuentoAplicadoVentas,
            idSesion: req.body.idSesion,
            idUsuario: req.body.idUsuario,
            idCliente: req.body.idCliente,
        });
        
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            const result = user.setRoles(roles);
            if (result) res.send({
                message: "Usuario registrado correctamente"
            });
        } else {
            const result = user.setRoles([1]);
            if (result) res.send({
                message: "Usuario registrado correctamente"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};