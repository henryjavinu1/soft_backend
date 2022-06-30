const db = require("../models/permisos");
const config = require("../config/auth.config");
const { permiso } = require("../models/user");
const Role = db.role;
const Op = db.Sequelize.Op;

//Creando un rool de usuario 

exports.crearol = async (req, res) => {
    try {
        const user = await user.findOne({
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
        }
        const rol = await Role.create({
            permiso: req.body.permiso,
            descripcion: req.body.descripcion, 
        });
        }
        catch (error) {
            return res.status(500).send({
                message: "Ocurrio un error"
            });
        }
    }