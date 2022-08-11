var PdfPrinter = require('pdfmake');
var fs = require('fs');
const { contenidoFactura, contenidoSinDetalles } = require('../pdf_files/pdf_styles/contenido.factura');
const { contenidoFacturaRapida } = require('../pdf_files/pdf_styles/contenido.facturarapida');
const fonts = require('../pdf_files/pdf_styles/fonts');

const filtrarFacturas = async (Factura, parametroBuscado = Factura, valorBuscado, Empleado, TipoPago, Talonario, Cliente) => {
    atributo = parametroBuscado;
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
    return facturasBuscadas;
}

const impresionDeFacturas = (facturasBuscadas) => {
    const facturas = facturasBuscadas.map((factura) => {
        const noExisteEmpleado = "No existe empleado."
        let existeEmpleado = true;
        let existeTalonario = true;
        let existeCliente = true;
        let existeDni = true;
        let existeRtn = true;
        let existeDireccion = true;
        let existeTelefonoCliente = true;
        if (!factura.empleado) {
            // factura.empleado.id = 0;
            existeEmpleado = false;
        }
        if (!factura.talonario) {
            existeTalonario = false;
        }
        if (!factura.cliente) {
            existeCliente = false;
            existeDni = false;
            existeRtn = false;
            existeDireccion = false;
            existeTelefonoCliente = false;
        } else {
            if (!factura.cliente.dni) {
                existeDni = false;
            }
            if (!factura.cliente.rtn) {
                existeRtn = false;
            }
            if (!factura.cliente.direccion) {
                existeDireccion = false;
            }
            if (!factura.cliente.telefonoCliente) {
                existeTelefonoCliente = false;
            }
        }
        return {
            idFactura: factura.idFactura,
            numeroFactura: factura.numeroFactura,
            fechaFactura: factura.fechaFactura,
            descuentoTotalFactura: factura.descuentoTotalFactura,
            isvTotalFactura: factura.isvTotalFactura,
            totalFactura: factura.totalFactura,
            subTotalFactura: factura.subTotalFactura,
            cantidadLetras: factura.cantidadLetras,
            idEmpleado: (!existeEmpleado) ? 0 : factura.empleado.id,
            nombreEmpleado: (!existeEmpleado) ? noExisteEmpleado : factura.empleado.nombre.trim() + " " + factura.empleado.apellido.trim(),
            tipoPago: factura.tipopago.tipoDePago,
            cai: (!existeTalonario) ? "No existe un talonario asociado a este CAI por favor comuniquese con el administrador." : factura.talonario.cai,
            nombreCliente: (!existeCliente) ? "No existe cliente" : factura.cliente.nombreCliente,
            dniCliente: (!existeDni) ? "" : factura.cliente.dniCliente,
            rtn: (!existeRtn) ? "" : factura.cliente.rtn,
            direccionCliente: (!existeDireccion) ? "" : factura.cliente.direccion,
            telefonoCliente: (!existeTelefonoCliente) ? "" : factura.cliente.telefonoCliente,
        }
    });
    return facturas;
}

const validarCampos = (factura, numeroFactura, fechaFactura, descuentoTotalFactura, isvTotalFactura, totalFactura, subTotalFactura, cantidadLetras, isDelete, estado) => {
    if (numeroFactura) {
        factura.numeroFactura = numeroFactura;
    }

    if (fechaFactura) {
        factura.fechaFactura = fechaFactura;
    }

    if (descuentoTotalFactura) {
        factura.descuentoTotalFactura = descuentoTotalFactura;
    }

    if (isvTotalFactura) {
        factura.isvTotalFactura = isvTotalFactura;
    }

    if (totalFactura) {
        factura.totalFactura = totalFactura;
    }

    if (subTotalFactura) {
        factura.subTotalFactura = subTotalFactura;
    }

    if (cantidadLetras) {
        factura.cantidadLetras = cantidadLetras;
    }

    if (isDelete) {
        factura.isDelete = isDelete;
    }

    if (estado) {
        factura.estado = estado;
    }

    return factura;
}

const filtrarFacturasPorFechaQuery = async (Op, Factura, fecha1, fecha2, Empleado, TipoPago, Talonario, Cliente) => {
    try {
        const facturaBuscada = await Factura.findAll({
            where: {
                [Op.and]: [
                    { isDelete: false },
                    {
                        fechaFactura: {
                            [Op.between]: [fecha1, fecha2]
                        }
                    }]
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
        return facturaBuscada;
    } catch (error) {
        console.log(error);
    }
}

const construirFacturaEnPDF = (factura, detallesDeVentas, tiempo) => {
    var fonts = {
        Roboto: {
            normal: 'app/pdf_files/fonts/Roboto-Regular.ttf',
            bold: 'app/pdf_files/fonts/Roboto-Medium.ttf',
            italics: 'app/pdf_files/fonts/Roboto-Italic.ttf',
            bolditalics: 'app/pdf_files/fonts/Roboto-MediumItalic.ttf'
        }
    };
    let content;
    if (detallesDeVentas.length > 0) {
        console.log('detalle de ventas: ' + detallesDeVentas.length);
        content = contenidoFactura(factura, detallesDeVentas);
    } else {
        content = contenidoSinDetalles(factura);
    }
    // console.log(content.content);

    if (tiempo === 1) {
        var docDefinition = {
            content: content.content,
        };
    } else {
        var docDefinition = {
            watermark: 'COPIA',
            content: content.content,
        };
    }

    var options = {
        // ...
    }
    var printer = new PdfPrinter(fonts);
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('./app/pdf_files/primera.pdf'));
    pdfDoc.end();

    const promesa = new Promise((resolve, reject) => {
        if (pdfDoc) {
            resolve(pdfDoc);
        } else {
            reject('Error al crear pdf');
        }
    });

    return promesa;

}

const construirFacturaRapida = (factura, detallesDeVentas, tiempo) => {
    var fonts = {
        Roboto: {
            normal: 'app/pdf_files/fonts/Roboto-Regular.ttf',
            bold: 'app/pdf_files/fonts/Roboto-Medium.ttf',
            italics: 'app/pdf_files/fonts/Roboto-Italic.ttf',
            bolditalics: 'app/pdf_files/fonts/Roboto-MediumItalic.ttf'
        }
    };
    let content;
    if (detallesDeVentas.length > 0) {
        console.log('detalle de ventas: ' + detallesDeVentas.length);
        content = contenidoFacturaRapida(factura, detallesDeVentas);
    } else {
        content = contenidoSinDetalles(factura);
    }
    // console.log(content.content);

    if (tiempo === 1) {
        var docDefinition = {
            pageMargins: [10, 10, 10, 10],
            pageSize: {
                width: 226.8,
                height: 'auto'
            },
            content: content.content,
            styles: {
                totales: {
                    alignment: 'right',
                    margin: [0, -2, 0, 0],
                    textTransform: 'uppercase',
                    fontSize: 8,
                },
                header: {
                    fontSize: 12,
                    alignment: 'center',
                    bold: true,
                    margin: [0, 0, 0, 4]
                },
                subheader: {
                    fontSize: 8,
                    alignment: 'center',
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 6
                }
            }
        }
    } else {
        var docDefinition = {
            watermark: 'COPIA',
            pageMargins: [10, 10, 10, 10],
            pageSize: {
                width: 226.8,
                height: 'auto'
            },
            content: content.content,
            styles: {
                totales: {
                    alignment: 'right',
                    margin: [0, -2, 0, 0],
                    textTransform: 'uppercase',
                    fontSize: 8,
                },
                header: {
                    fontSize: 12,
                    alignment: 'center',
                    bold: true,
                    margin: [0, 0, 0, 4]
                },
                subheader: {
                    fontSize: 8,
                    alignment: 'center',
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 6
                }
            }
        }
    }

    var options = {
        // ...
    }
    var printer = new PdfPrinter(fonts);
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('./app/pdf_files/primerarapida.pdf'));
    pdfDoc.end();

    const promesa = new Promise((resolve, reject) => {
        if (pdfDoc) {
            resolve(pdfDoc);
        } else {
            reject('Error al crear pdf');
        }
    });

    return promesa;

}

module.exports = {
    impresionDeFacturas,
    validarCampos,
    filtrarFacturasPorFechaQuery,
    construirFacturaEnPDF,
    construirFacturaRapida
    // filtrarFacturas,
}