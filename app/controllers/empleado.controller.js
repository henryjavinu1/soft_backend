const { request, response } = require('express');
const { Op, DataTypes } = require("sequelize");
const db = require('../models/puntoDeVentas');
const { validarCamposEmpleado } = require('../helpers/empleado.helper');
const Empleado = db.empleado;

// crear Empleado
exports.crearEmpleado = async (req = request, res = response) => {
    try {
        const insertEmpleado = await Empleado.create({
            idEmpleado: req.body.idEmpleado,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fechaNacimiento,
            sexo: req.body.sexo,
        });
        return res.status(200).send({
            message: "Empleado creado con exito",
            insertEmpleado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        });
    }
}

//buscar empleado por id
exports.buscarEmpleado = async (req = request, res = response) => {
    try {
        const empleadoBuscado = await Empleado.findAll({
            raw: true,
            where: {
                id: req.body.id,
            },
        });
        console.log(empleadoBuscado);
        if (!empleadoBuscado) {
            return res.status(404).json({
                msg: "El empleado buscado no existe"
            })
        } else {
            return res.status(200).json({
                empleadoBuscado
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//buscar Empleado por nombre
exports.buscarEmpleadoPorNombre = async (req = request, res = response) => {
    const nombre = req.query.nombre;
    console.log(nombre);
    try {
        const EmpleadoBuscado = await Empleado.findOne({
            where: {
                nombre: {
                    [Op.like]: req.body.nombre
                }
            },
        });
        if (!EmpleadoBuscado) {
            return res.status(404).json({
                msg: "El empleado no existe"
            })
        }
        return res.status(200).json({
            EmpleadoBuscado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Buscar todos los empleados
exports.traerTodosLosEmpleados = async (req = request, res = response) => {
    try {
        const todoslosEmpleados = await Empleado.findAll({

        });
        if (!todoslosEmpleados) {
            return res.status(404).json({
                msg: "No hay Empleados "
            })
        }
        return res.status(200).json({
            todoslosEmpleados
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Actualizar 
exports.actualizarEmpleado = async (req = request, res = response) => {
    const idEmpleado = req.body.idEmpleado;
    const { nombre, apellido, direccion, telefono, fechaNacimiento, sexo, isDelete } = req.body;
    console.log(idEmpleado);
    try {
        const EmpleadoBuscado = await Empleado.findOne({
            where: {
                idEmpleado: req.body.idEmpleado
            },
        });
        if (!EmpleadoBuscado) {
            return res.status(404).json({
                msg: "Cliente no existe"
            })
        }
        validarCamposEmpleado(EmpleadoBuscado, idEmpleado, nombre, apellido, direccion, telefono, fechaNacimiento, sexo, isDelete)
        EmpleadoBuscado.save();
        return res.status(200).json({
            message: "cliente actualizado con exito",
            empleado: EmpleadoBuscado,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Eliminar
exports.eliminarEmpleado = async (req, res) => {
    try {
        const eliminarEmpleado = await Empleado.update({
            isDelete: true
        }, {
            where: {
                idEmpleado: req.body.idEmpleado
            }
        });
        if (eliminarEmpleado) {
            res.status(200).json({
                message: "Cliente eliminado correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Error al eliminar cliente: " + error.message
        });
    }
}