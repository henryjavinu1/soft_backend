const db = require("../models/detalle_venta");
const config = require("../config/auth.config");
const Ventas = db.ventas;
const DetalleVenta = db.detalle_venta;
const Role = db.role;
const User = db.user;
const Op = db.sequelize.Op;

exports.signup = async (req, res) => {
    try{
        const detalle_venta = await DetalleVenta.create({
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario, 
            isvAplicado: req.body.isvAplicado,
            totalDetalleVenta: req.body.totalDetalleVenta,
            idVentas: req.body.idVentas,
            idProducto: req.body.idProducto,
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