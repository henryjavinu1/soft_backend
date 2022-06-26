const db = require("../models/arqueo");
const config = require("../config/auth.config");
const e = require("express");
const User = db.user;
const Sesion = db.sesion;
const arqueo = db.arqueo;
const Op = db.Sequelize.Op;

//crear un procedimiento almacenado que al iniciar sesion cree un arqueo y lo guarde en la base de datos
//y validar el rol que tiene el usuario para saber si tiene permiso para crear un arqueo
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                usuario: req.body.username,
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
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "La contraseña es incorrecta"
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        const sesion = await Sesion.create({
            fecha: new Date(),
            token: token,
            isDelete: false,
            isActive: true,
            userId: user.id
        });
        const arqueo = await arqueo.create({
            fecha: new Date(),
            isDelete: false,
            isActive: true,
            sesionId: sesion.id
        });
        if (user.roles[0].name === "ADMIN") {
            return res.status(200).send({
                accessToken: token,
                user: user,
                message: "Bienvenido administrador"
            });
        } else if (user.roles[0].name === "USER") {
            return res.status(200).send({
                accessToken: token,
                user: user,
                message: "Bienvenido usuario"
            });
        } else {
            return res.status(200).send({
                accessToken: token,
                user: user,
                message: "Bienvenido"
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//crear un procedimiento almacenado que al cerrar la sesion modifique los datos del arqueo que la sesion este activa
// y que el id del usuario sea el mismo de la sesion activa
exports.signout = async (req, res) => {
    try {
        const sesion = await Sesion.findOne({
            where: {
                token: req.headers.authorization,
                isDelete: false,
                isActive: true
            }
        });
        if (!sesion) {
            return res.status(404).send({
                message: "La sesion no existe"
            });
        }
        const arqueo = await arqueo.findOne({
            where: {
                sesionId: sesion.id,
                isDelete: false,
                isActive: true
            }
        });
        if (!arqueo) {
            return res.status(404).send({
                message: "El arqueo no existe"
            });
        }
        const sesionUpdate = await Sesion.update({
            isActive: false,
            isDelete: true
        }, {
            where: {
                id: sesion.id
            }
        });
        const arqueoUpdate = await arqueo.update({
            //faltaria la tabla ventas para poder hacer los calculos correspondientes del arqueoupdate
            fechaFinal: new Date(),
            isDelete: false
        }, {
            where: {
                id: arqueo.id
            }
        });
        return res.status(200).send({
            message: "Sesion cerrada"
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//crear un procedimiento almacenado que permita cambiar el estado isDelete de un arqueo 

exports.delete = async (req, res) => {
    try {
        //verificar si el usuario que ejecutara la accion tenga los permisos necesarios
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
        const arqueo = await arqueo.findOne({
            where: {
                id: req.params.id,
                isDelete: false,
            }
        });
        if (!arqueo) {
            return res.status(404).send({
                message: "El arqueo no existe"
            });
        }
        const arqueoUpdate = await arqueo.update({
            isDelete: true
        }, {
            where: {
                id: arqueo.id
            }
        });
        return res.status(200).send({
            message: "Arqueo eliminado"
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//crear un procedimiento almacenado que permita mostrar todos los arqueos que su isDelete sea false
exports.findAll = async (req, res) => {
    try {
        //validar que el usuario tenga los permisos para mostrar los arqueos
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
        const arqueos = await arqueo.findAll({
            where: {
                isDelete: false
            }
        });
        if (!arqueos) {
            return res.status(404).send({
                message: "No hay arqueos"
            });
        }
        return res.status(200).send({
            arqueos
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}

//crear un procedimiento almacenado que permita buscar un arqueo por su idUsuario o por fecha de inicio
exports.findOne = async (req, res) => {
    try {
        //validar que el usuario tenga los permisos para buscar los arqueos
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
        const arqueo = await arqueo.findOne({
            where: {
                //filtrarlos por el idUsuario o por la fecha de inicio del arqueo
                idUsuario: req.params.idUsuario,
                fechaInicio: req.params.fechaInicio,
                id: req.params.id,
                isDelete: false,
            }
        });
        if (!arqueo) {
            return res.status(404).send({
                message: "El arqueo no existe"
            });
        }
        return res.status(200).send({
            arqueo
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error"
        });
    }
}