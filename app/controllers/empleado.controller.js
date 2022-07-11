const { request, response } = require('express');
const { Op, DataTypes } = require("sequelize");
const db = require('../models/puntoDeVentas');
const { validarCamposEmpleado } = require('../helpers/empleado.helper');
const Empleado = db.empleado;

// crear Empleado
exports.crearEmpleado = async (req = request, res = response) => {
    try {
        const insertEmpleado = await Empleado.create({
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
            const resp = {
                nombre: empleadoBuscado.nombre,
                apellido: empleadoBuscado.apellido,
                direccion: empleadoBuscado.direccion,
                telefono: empleadoBuscado.telefono,
                fechaNacimiento: empleadoBuscado.fechaNacimiento,
                sexo: empleadoBuscado.sexo,
                isDelete: empleadoBuscado.isDelete,
                createdAt: empleadoBuscado.createdAt,
                updateAt: empleadoBuscado.createdAt
            }
            return res.status(200).send(resp);
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
        const resp = {
            nombre: EmpleadoBuscado.nombre,
            apellido: EmpleadoBuscado.apellido,
            direccion: EmpleadoBuscado.direccion,
            telefono: EmpleadoBuscado.telefono,
            fechaNacimiento: EmpleadoBuscado.fechaNacimiento,
            sexo: EmpleadoBuscado.sexo,
            isDelete: EmpleadoBuscado.isDelete,
            createdAt: EmpleadoBuscado.createdAt,
            updateAt: EmpleadoBuscado.createdAt
        }
        return res.status(200).send(resp);
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
        const resp = {
            nombre: todoslosEmpleados.nombre,
            apellido: todoslosEmpleados.apellido,
            direccion: todoslosEmpleados.direccion,
            telefono: todoslosEmpleados.telefono,
            fechaNacimiento: todoslosEmpleados.fechaNacimiento,
            sexo: todoslosEmpleados.sexo,
            isDelete: todoslosEmpleados.isDelete,
            createdAt: todoslosEmpleados.createdAt,
            updateAt: todoslosEmpleados.createdAt
        }
        return res.status(200).send(resp); 
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Actualizar 
exports.actualizarEmpleado = async (req = request, res = response) => {
    const id = req.body.id;
    const { nombre, apellido, direccion, telefono, fechaNacimiento, sexo, isDelete } = req.body;
    console.log(id);
    try {
        const EmpleadoBuscado = await Empleado.findOne({
            where: {
                id: req.body.id
            },
        });
        if (!EmpleadoBuscado) {
            return res.status(404).json({
                msg: "Cliente no existe"
            })
        }
        validarCamposEmpleado(EmpleadoBuscado, id, nombre, apellido, direccion, telefono, fechaNacimiento, sexo, isDelete)
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