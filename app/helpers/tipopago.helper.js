

const impresionDeTipoPago = (pagoBuscadas) => {
    const tipopago = pagoBuscadas.map((tipopago) => {
  
        return {
            idTipoPago: tipopago.idTipoPago,
            tipoDePago: tipopago.tipoDePago,
            descripcionTipoPago: tipopago.descripcionTipoPago,
        }
    });
    return tipopago;
}

module.exports = {
    impresionDeTipoPago,
    // filtrarFacturas,

}