const NumeroALetras = require("../../helpers/generarfactura.helpers");

// playground requires you to assign document definition to a variable called dd
const contenidoFacturaRapida = (factura, detallesDeVentas) => {
    // console.log(factura);
    let totalFactura = 0.00;
    let subTotal = 0.00;
    let totalExcento = 0.00;
    let importeGravado15 = 0.00;
    let importeGravado18 = 0.00;
    let isv15 = 0.00;
    let isv18 = 0.00;
    if (detallesDeVentas.length !== 0) {
        for (let i = 0; i < detallesDeVentas.length; i++) {
          if (detallesDeVentas[i].producto.isExcento) {
            totalExcento += (Number(detallesDeVentas[i].cantidad)*Number(detallesDeVentas[i].precioUnitario));
          } else {
            if (Number(detallesDeVentas[i].isvAplicado) === 18) {
              importeGravado18 += ((Number(detallesDeVentas[i].cantidad)*Number(detallesDeVentas[i].precioUnitario)) / 1.18);
            } else {
              importeGravado15 += ((Number(detallesDeVentas[i].cantidad)*Number(detallesDeVentas[i].precioUnitario)) / 1.15);
            }
          }
        }
        isv18 += (importeGravado18 * 0.18);
        isv15 += (importeGravado15 * 0.15);
        subTotal = (totalExcento + importeGravado15 + importeGravado18).toFixed(2);
        totalFactura = (totalExcento + importeGravado15 + importeGravado18 + isv15 + isv18);
      } else {
        totalFactura = 0.00;
        subTotal = 0.00;
        totalExcento = 0.00;
        importeGravado15 = 0.00;
        importeGravado18 = 0.00;
        isv15 = 0.00;
        isv18 = 0.00;
      }
    

    function itemTable() {
        listaDeItems = [];
        listaDeItems.push([
            {
                text: 'Cantidad / Precio / Descripcion',
                border: [false, true, false, true],
                margin: [0, 0, 0, 0],
                textTransform: 'uppercase',
                bold: true,
                fontSize: 8,
            },
            {
                text: 'Total',
                border: [false, true, false, true],
                alignment: 'right',
                bold: true,
                margin: [0, 0, 0, 0],
                textTransform: 'uppercase',
                fontSize: 8,
            },
        ])

        if (detallesDeVentas) {
            for (let i = 0; i < detallesDeVentas.length; i++) {
                listaDeItems.push([
                    {
                        columns: [
                            [
                                { text: `${detallesDeVentas[i].cantidad.toString()} X ${detallesDeVentas[i].precioUnitario.toString()} ${detallesDeVentas[i].producto.nombreProducto.toString()}` },
                                { text: `ISV ${(Number(detallesDeVentas[i].isvAplicado) != 15 || Number(detallesDeVentas[i].isvAplicado) != 18 || Number(detallesDeVentas[i].isvAplicado) != 0) ? '15' : detallesDeVentas[i].isvAplicado.toString()}% DESC: ${detallesDeVentas[i].descuentoAplicado}` }
                            ]
                        ],
                        border: [false, false, false, false],
                        margin: [0, 0, 0, 0],
                        textTransform: 'uppercase',
                        fontSize: 8,
                    },
                    {
                        text: `${(Number(detallesDeVentas[i].cantidad) * Number(detallesDeVentas[i].precioUnitario))}`,
                        border: [false, false, false, false],
                        alignment: 'right',
                        margin: [0, 0, 0, 0],
                        textTransform: 'uppercase',
                        fontSize: 8,
                    }
                ])
            }
        }
        return listaDeItems;
    }

    var contenido = {
        content: [
            {
                text: `${factura.talonario.sucursale.nombreSucursal}`,
                style: 'header'
            },
            {
                text: `R.T.N.: ${factura.talonario.sucursale.rtn}`,
                style: 'subheader'
            },
            {
                text: `${factura.talonario.sucursale.direccion}`,
                style: 'subheader'
            },
            {
                text: `TEL: ${factura.talonario.sucursale.telefono}`,
                style: 'subheader'
            },
            {
                text: `Correo: ${factura.talonario.sucursale.email}`,
                style: 'subheader'
            },
            {
                text: `C.A.I.: ${factura.talonario.cai}`,
                style: 'subheader'
            },
            {
                text: `Rango autorizado del: ${factura.talonario.rangoInicialFactura.toString()} al ${factura.talonario.rangoFinalFactura.toString()}`,
                style: 'subheader'
            },
            {
                text: `Fecha límite de emisión: ${factura.talonario.fechaLimiteEmision.toString().substring(8, 10)}/${factura.talonario.fechaLimiteEmision.toString().substring(5, 7)}/${factura.talonario.fechaLimiteEmision.toString().substring(0, 4)}`,
                style: 'subheader'
            },
            {
                columns: [
                    [
                        {
                            alignment: 'left',
                            text: 'Factura',
                            style: 'subheader'
                        },
                        {
                            alignment: 'left',
                            text: `${factura.numeroFactura}`,
                            style: 'subheader'
                        }
                    ],
                    [
                        {
                            alignment: 'right',
                            text: 'Fecha',
                            style: 'subheader'
                        },
                        {
                            alignment: 'right',
                            text: `${factura.fechaFactura.toString().substring(8, 10)}/${factura.fechaFactura.toString().substring(5, 7)}/${factura.fechaFactura.toString().substring(0, 4)}`,
                            style: 'subheader'
                        },
                    ]
                ]
            },
            {
                text: `Cliente ${factura.cliente.nombreCliente}`,
                style: 'subheader',
                margin: [0, 3, 0, 0],
            },
            {
                text: `R.T.N.: ${(factura.cliente.rtn) ? factura.cliente.rtn : '---'} TEL: ${(factura.cliente.telefonoCliente) ? factura.cliente.telefonoCliente : '---'}`,
                style: 'subheader',
            },
            {
                text: `${factura.cliente.direccion}`,
                style: 'subheader',
            },
            {
                margin: [0, 5, 0, 5],
                table: {
                    eaderRows: 1,
                    widths: [140, '*'],
                    body: itemTable()
                }
            },
            {
                table: {
                    eaderRows: 1,
                    widths: [140, '*'],
                    body: [
                        [
                            {
                                alignment: 'right',
                                text: 'DESCUENTO Y REBAJAS:',
                                border: [false, true, false, false],
                                margin: [0, 0, 0, 0],
                                textTransform: 'uppercase',
                                fontSize: 8,
                            },
                            {
                                text: 'L0.00',
                                border: [false, true, false, false],
                                alignment: 'right',
                                margin: [0, 0, 0, 0],
                                textTransform: 'uppercase',
                                fontSize: 8,
                            },

                        ],
                        [
                            {
                                text: 'IMPORTE EXONERADO:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: 'L0.00',
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'IMPORTE GRAVADO 15%:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: importeGravado15.toFixed(2),
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'IMPORTE GRAVADO 18%:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: importeGravado18.toFixed(2),
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'ISV 15%:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: isv15.toFixed(2),
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'ISV 18%:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: isv18.toFixed(2),
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'Sub total:',
                                border: [false, false, false, false],
                                style: 'totales'
                            },
                            {
                                text: subTotal,
                                border: [false, false, false, false],
                                style: 'totales'
                            },

                        ],
                        [
                            {
                                text: 'TOTAL A PAGAR:',
                                border: [false, false, false, false],
                                bold: true,
                                margin: [0, -2, 0, 0],
                                textTransform: 'uppercase',
                                alignment: 'right',
                                fontSize: 8,
                            },
                            {
                                text: totalFactura.toFixed(2),
                                border: [false, false, false, false],
                                bold: true,
                                margin: [0, -2, 0, 0],
                                fontSize: 8,
                                alignment: 'right',
                            },

                        ],
                    ]

                }
            },
            {
                text: `${NumeroALetras(totalFactura.toFixed(2))}`,
                style: 'subheader'
            },
            {
                text: 'ORIGINAL: CLIENTE  /  COPIA: EMISOR',
                style: 'subheader'
            },
            {
                alignment: 'center',
                text: 'La factura es beneficio de todos exijala.',
                style: ['quote', 'small']
            }
        ],

    }

    return contenido;
}

module.exports = {
    contenidoFacturaRapida,
}