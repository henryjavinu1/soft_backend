const impresionDeTipoPago = (tipoPagoBuscado) => {
    const tipoDePago = tipoPagoBuscado.map((tipoDePago) => {
        return {
            idTipoPago: tipoDePago.idTipoPago,
            tipoDePago: tipoDePago.tipoDePago,
            descripcionTipoPago: tipoDePago.descripcionTipoPago,
        }
    });
    return tipoDePago;
}



module.exports = {
    impresionDeTipoPago,

}