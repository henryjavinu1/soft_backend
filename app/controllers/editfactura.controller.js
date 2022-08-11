const { request, response } = require('express');
const { Op, DataTypes } = require("sequelize");
const fs = require('fs');

const { impresionDeFacturas, validarCampos, filtrarFacturasPorFechaQuery, construirFacturaEnPDF, construirFacturaRapida } = require('../helpers/manipularfactura.helper');
const db = require('../models/puntoDeVentas');
const path = require('path');
const Factura = db.factura;
const Cliente = db.cliente;
const Talonario = db.talonario;
const Empleado = db.empleado;
const TipoPago = db.tipopago;
const Venta = db.ventas;
const DetalleVenta = db.detalleventa;
const Producto = db.producto;
const Sucursal = db.sucursal;

const traerFacturas = async (req = request, res = response) => {
    try {
        const todasLasFacturas = await Factura.findAll({
            where: {
                isDelete: false,
            },
            include: [
                {
                    model: Empleado,
                    attributes: ['id', 'nombre', 'apellido'],
                },
                {
                    model: TipoPago,
                    attributes: ['tipoDePago']
                },
                {
                    model: Talonario,
                    attributes: ['cai']
                },
                {
                    model: Cliente,
                    attributes: ['nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
                }
            ]
        });
        const facturas = impresionDeFacturas(todasLasFacturas);
        res.json({
            facturas
        })
    } catch (error) {
        console.log(error);
    }
}

const buscarfactura = async (req = request, res = response) => {
    const numeroFactura = req.query.numeroFactura;
    // const numReq = Object.keys(req.query).length
    try {
        const facturaBuscada = await Factura.findOne({
            where: {
                [Op.and]: [{ numeroFactura: numeroFactura }, { isDelete: false }]
            },
            include: [
                {
                    model: Empleado,
                    attributes: ['id', 'nombre', 'apellido'],
                },
                {
                    model: TipoPago,
                    attributes: ['tipoDePago']
                },
                {
                    model: Talonario,
                    attributes: ['cai']
                },
                {
                    model: Cliente,
                    attributes: ['nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
                }
            ]
        });
        if (!facturaBuscada) {
            return res.status(404).json({
                msg: "La factura que intenta buscar no existe"
            })
        }
        return res.status(200).json({
            unafactura: facturaBuscada
        });
    } catch (error) {
        console.log(error);
    }
}

const buscarFacturaCliente = async (req, res) => {
    const { nombreCliente, rtn, dni } = req.query;
    let clienteBuscado;
    try {
        if (nombreCliente) {
            clienteBuscado = await Cliente.findOne({
                where: {
                    [Op.and]: [{ isDelete: false }, { nombreCliente: nombreCliente }]
                }
            });
        } else if (rtn) {
            clienteBuscado = await Cliente.findOne({
                where: {
                    [Op.and]: [{ isDelete: false }, { rtn: rtn }]
                }
            });
        } else if (dni) {
            clienteBuscado = await Cliente.findOne({
                where: {
                    [Op.and]: [{ isDelete: false }, { dni: dni }]
                }
            });
        }
        if (!clienteBuscado) {
            return res.status(404).json({
                msg: `El cliente ingresado no existe`
            });
        }
        const facturasBuscadas = await Factura.findAll({
            where: {
                [Op.and]: [{ idCliente: clienteBuscado.id }, { isDelete: false }]
            },
            include: [
                {
                    model: Empleado,
                    attributes: ['id', 'nombre', 'apellido'],
                },
                {
                    model: TipoPago,
                    attributes: ['idTipoPago', 'tipoDePago']
                },
                {
                    model: Talonario,
                    attributes: ['idTalonario', 'cai']
                },
                {
                    model: Cliente,
                    attributes: ['id', 'nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
                }
            ]
        });
        if (facturasBuscadas.length === 0) {
            return res.status(404).json({
                msg: `El cliente: ${clienteBuscado.nombreCliente} no tiene facturas`
            })
        }
        const facturas = impresionDeFacturas(facturasBuscadas);
        return res.status(200).json({
            facturas
        });
    } catch (error) {
        console.log(error);
    }
}

const buscarFacturaFecha = async (req, res) => {
    const { fecha1, fecha2 } = req.query;
    let facturaBuscada = [];
    try {
        if (fecha1 && !fecha2) {
            // Función para poder buscar facturas por fecha aceptando dos parametros de búsqueda.
            facturaBuscada = await filtrarFacturasPorFechaQuery(Op, Factura, fecha1, fecha1, Empleado, TipoPago, Talonario, Cliente);
        } else if (fecha1 && fecha2) {
            facturaBuscada = await filtrarFacturasPorFechaQuery(Op, Factura, fecha1, fecha2, Empleado, TipoPago, Talonario, Cliente);
        }
        if (facturaBuscada.length === 0) {
            return res.status(404).json({
                msg: (fecha1 && !fecha2)
                    ? `No hay facturas registradas en la fecha: ${fecha1}`
                    : `No hay facturas registradas entre las fechas: ${fecha1}, ${fecha2}`
            })
        }
        const facturas = impresionDeFacturas(facturaBuscada);
        return res.status(200).json({
            facturas
        });
    } catch (error) {
        console.log(error);
    }

    // return res.status(200).json({facturaBuscada});
}

const buscarFacturaEmpleado = async (req = request, res = response) => {
    const nombre = req.query.nombre;
    try {
        const empleadoBuscado = await Empleado.findAll({
            where: {
                nombre: nombre,
            }
        });

        if (empleadoBuscado.length === 0) {
            return res.status(404).json({
                msg: 'No existe el empleado indicado',
            });
        }

        let facturasBuscadas = [];
        for (let i = 0; i < empleadoBuscado.length; i++) {
            let idEmpleado2 = empleadoBuscado[i].id;
            console.log(idEmpleado2);
            facturasBuscadas = await Factura.findAll({
                where: {
                    [Op.and]: [{ idEmpleado: idEmpleado2 }, { isDelete: false }]
                },
                include: [
                    {
                        model: Empleado,
                        attributes: ['id', 'nombre', 'apellido'],
                    },
                    {
                        model: TipoPago,
                        attributes: ['tipoDePago']
                    },
                    {
                        model: Talonario,
                        attributes: ['cai']
                    },
                    {
                        model: Cliente,
                        attributes: ['nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
                    }
                ]
            })
        }

        console.log(facturasBuscadas);

        if (facturasBuscadas.length === 0) {
            return res.status(404).json({
                msg: `No hay facturas generadas para la búsqueda realizada.`
            });
        }
        const facturas = impresionDeFacturas(facturasBuscadas);
        res.status(200).json({
            facturas
        });
    } catch (error) {
        console.log(error);
    }
}

const buscarPorTalonario = async (req = request, res = response) => {
    const { idTalonario, cai } = req.query;
    let talonarioBuscado;

    try {
        console.log(idTalonario);
        if (idTalonario) {
            talonarioBuscado = await Talonario.findOne({
                where: { idTalonario: idTalonario }
            });
        } else if (cai) {
            talonarioBuscado = await Talonario.findOne({
                where: { cai: cai }
            })
        }
        if (!talonarioBuscado) {
            return res.status(404).json({
                msg: `No existe el talonario con ${(idTalonario) ? `el cai: ${idTalonario}` : `el id: ${cai}`}. Por favor verifique bien los datos del talonario a buscar.`
            })
        }
        const facturaBuscada = await Factura.findAll({
            where: { idTalonario: talonarioBuscado.idTalonario },
            include: [
                {
                    model: Empleado,
                    attributes: ['id', 'nombre', 'apellido'],
                },
                {
                    model: TipoPago,
                    attributes: ['tipoDePago']
                },
                {
                    model: Talonario,
                    attributes: ['cai']
                },
                {
                    model: Cliente,
                    attributes: ['nombreCliente', 'direccion', 'dni', 'email', 'rtn', 'telefonoCliente']
                }
            ]
        })
        const facturas = impresionDeFacturas(facturaBuscada);
        return res.status(200).json({
            facturas
        });
    } catch (error) {
        console.log(error);
    }
}

const imprimirUnaFactura = async (req = request, res = response) => {
    const numeroFactura = req.query.numeroFactura;
    console.log(numeroFactura);
    try {
        let facturaBuscada = await Factura.findOne({
            where: {
                [Op.and]: [{ isDelete: false }, { numeroFactura: numeroFactura }]
            },
            include: [
                {
                    model: Venta,
                },
                {
                    model: Empleado,
                },
                {
                    model: TipoPago,
                },
                {
                    model: Talonario,
                },
                {
                    model: Cliente,
                }
            ]
        });
        if (facturaBuscada) {
            let detallesDeVentas = [];
            if (facturaBuscada.venta) {
                detallesDeVentas = await DetalleVenta.findAll({
                    where: { isDelete: false, idVentas: facturaBuscada.venta.id },
                    include: [
                        {
                            model: Producto
                        }
                    ]
                });
            }
    
            return res.status(200).json({
                facturaConDatos: facturaBuscada,
                detallesDeVentas
            });
        } else {
            return res.status(404).json({
                msg: 'No existe una factura con el número indicado.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
        });
    }
}

const descargarFactura = async (req = request, res = response) => {

    const numeroFactura = req.query.numerofactura;
    const tipoFactura = req.query.tipo;
    const tiempo = req.query.tiempo;
    // console.log('num factura: '+numeroFactura);
    let detallesDeVentas = [];
    let facturaBuscada
    try {
        facturaBuscada = await Factura.findOne({
            where: {
                [Op.and]: [{ isDelete: false }, { numeroFactura: numeroFactura }]
            },
            include: [
                {
                    model: Venta,
                },
                {
                    model: Empleado,
                },
                {
                    model: TipoPago,
                },
                {
                    model: Talonario,
                    include: [
                        {
                            model: Sucursal
                        }
                    ]
                },
                {
                    model: Cliente,
                }
            ]
        });
        if (facturaBuscada.venta) {
            detallesDeVentas = await DetalleVenta.findAll({
                where: { isDelete: false, idVentas: facturaBuscada.venta.id },
                include: [
                    {
                        model: Producto
                    }
                ]
            });
        }
        if (facturaBuscada) {
            if (Number(tipoFactura) === 2) {
                construirFacturaEnPDF(facturaBuscada, detallesDeVentas, Number(tiempo)).then(pdfDoc => {
                    var file = fs.createReadStream('./app/pdf_files/primera.pdf');
                    // var stat = fs.statSync('./app/pdf_files/primera.pdf');
                    // res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename=factura${facturaBuscada.numeroFactura}.pdf`);
                    file.pipe(res);
                    fs.unlinkSync('app/pdf_files/primera.pdf');
                    // fs.unlinkSync('app/pdf_files/primera.pdf');
                }).catch(err => {
                    res.status(500).json(
                        {
                            msg: err
                        }
                    )
                });
            } else {
                construirFacturaRapida(facturaBuscada, detallesDeVentas, Number(tiempo)).then(pdfDoc => {
                    var file = fs.createReadStream('./app/pdf_files/primerarapida.pdf');
                    // var stat = fs.statSync('./app/pdf_files/primera.pdf');
                    // res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename=factura${facturaBuscada.numeroFactura}.pdf`);
                    file.pipe(res);
                    fs.unlinkSync('app/pdf_files/primerarapida.pdf');
                    // fs.unlinkSync('app/pdf_files/primera.pdf');
                }).catch(err => {
                    res.status(500).json(
                        {
                            msg: err
                        }
                    )
                });
            }
        } else {
            return res.status(400).json({
               msg: 'No se encontró el documento solicitado.' 
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar el registro en la base de datos comuniquese con el administrador.',
            factura: facturaBuscada
        });
    }


    // return res.status(200).download(path.join(__dirname, '../pdf_files/prueba.pdf'));
}

const editarFactura = async (req = request, res = response) => {
    const numeroFactura = req.params.id;
    const { fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado } = req.body;
    console.log(numeroFactura);
    try {
        const facturaBuscada = await Factura.findOne({
            where: { numeroFactura: numeroFactura },
        });

        if (!facturaBuscada) {
            return res.status(404).json({
                msg: "La factura ingresada no existe"
            })
        }

        validarCampos(facturaBuscada, numeroFactura, fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado)

        facturaBuscada.save();

        // facturaBuscada.update({
        //     cantidadLetras: "DOS CIENTOS OCHENTA Y CUATRO PUNTO VEINTI TRES"
        // })

        return res.status(200).json({
            message: "Factura actualizada con exito",
            factura: facturaBuscada,
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    editarFactura,
    traerFacturas,
    buscarfactura,
    buscarFacturaCliente,
    buscarFacturaFecha,
    buscarFacturaEmpleado,
    buscarPorTalonario,
    imprimirUnaFactura,
    descargarFactura
}