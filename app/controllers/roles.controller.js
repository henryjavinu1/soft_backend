const db = require("../models/puntoDeVentas");
const config = require("../config/auth.config");
const { permiso } = require("../models/puntoDeVentas");
const Role = db.role;
const Op = db.Sequelize.Op;

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const rol = await Role.create({
            rol: req.body.rol,
            descripcion: req.body.descripcion,
        });
        return res.status(200).send(rol);
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

