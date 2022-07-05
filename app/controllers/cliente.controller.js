const { request, response } = require('express');
const  {Op, DataTypes}  = require("sequelize");
const db = require('../models/puntoDeVentas');
const { validarCamposCliente } = require('../helpers/cliente.helper');
const Cliente = db.cliente;

// crear cliente 
exports.crearCliente = async (req = request, res = response) => {
    try {
        const insertCliente = await Cliente.create({
            dni: req.body.dni,
            email: req.body.email,
            rtn: req.body.rtn, 
            nombreCliente: req.body.nombreCliente,
            direccion: req.body.direccion,
            telefonoCliente: req.body.telefonoCliente,
        });
        return res.status(200).send({
            message: "Cliente Creado",
            insertCliente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({    
            message: "Ocurrio un error" + error
        });
    }
}
//buscar cliente por dni
exports.buscarCliente = async (req = request, res = response)=>{
    const dni = req.query.dni;
    console.log(dni);
    try{
        const clienteBuscado = await Cliente.findOne({
            where:{
                dni:{
                    [Op.like]: req.body.dni
                }
            },
        });
        if (!clienteBuscado){
            return res.status(404).json({
                msg: "El Dni del cliente no existe"
            })
        }
        return res.status(200).json({
            clienteBuscado
        });
    } catch (error){
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
}
}
//buscar cliente por nombre
exports.buscarClientePorNombre = async (req = request, res = response)=>{
    const nombreCliente = req.query.nombreCliente;
    console.log(nombreCliente);
    try{
        const clienteBuscado = await Cliente.findOne({
            where:{
                nombreCliente:{
                    [Op.like]: req.body.nombreCliente
                }
            },
        });
        if (!clienteBuscado){
            return res.status(404).json({
                msg: "El cliente no existe"
            })
        }
        return res.status(200).json({
            clienteBuscado
        });
    } catch (error){
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
}
}
//Buscar todos los clientes 
exports.traerTodosLosClientes = async (req = request, res = response) => { 
    try {
        const todoslosClientes = await Cliente.findAll({
    
        });
        if (!todoslosClientes){
            return res.status(404).json({
                msg: "No hay ningun cliente creado"
            })
        }
        return res.status(200).json({
            todoslosClientes
        })
     } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Actualizar 
exports.actualizarCliente = async (req = request, res = response) => {
    const dni = req.body.dni;
    const {email, rtn, nombreCliente, direccion, telefonoCliente, isDelete} = req.body;
    console.log(dni);
    try {
        const clienteBuscado = await Cliente.findOne({
            where:{
                dni: req.body.dni
            },
        });
        if (!clienteBuscado) {
            return res.status(404).json({
                msg: "Cliente no existe"
            })
        }
        validarCamposCliente (clienteBuscado, dni, email, rtn, nombreCliente, direccion, telefonoCliente, isDelete)
        clienteBuscado.save();      
        return res.status(200).json({
            message: "cliente actualizado con exito",
            cliente: clienteBuscado,
        });

     } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Ocurrio un error" + error
        })
    }
}
//Eliminar
exports.eliminarCliente = async (req, res) => {
    try {
        const eliminarCliente = await Cliente.update({
            isDelete: true
        },{
            where: {
                id: req.body.id
            }
        });
        if(eliminarCliente){
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


