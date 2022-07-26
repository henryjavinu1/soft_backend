const impresionArqueo = (arqueo) => {
    const arqueoImpresion = arqueo.map((arqueo) => {
        return {
            idArqueo: arqueo.idArqueo,
            fechaInicio: arqueo.fechaInicio,
            fechaFinal: arqueo.fechaFinal,
            efectivoApertura: arqueo.efectivoApertura,
            efectivoCierre: arqueo.efectivoCierre,
            otrosPagos: arqueo.otrosPagos,
            ventaCredito: arqueo.ventaCredito,
            ventaTotal: arqueo.ventaTotal,
            efectivoTotal: arqueo.efectivoTotal,
            isDelete: arqueo.isDelete,
            createdAt: arqueo.createdAt,
            updatedAt: arqueo.updatedAt,
            idUsuario: arqueo.idUsuario,
            idSesion: arqueo.idSesion,
        }
    });
    return arqueoImpresion;
}

module.exports = {
    impresionArqueo,
}