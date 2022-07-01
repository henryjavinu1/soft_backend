const validarCamposCliente = (req, res, next) => {
    const {nombreCliente, rtn} = req.query;
    const regexRtn = /^\d+$/

    if (!nombreCliente && !rtn) {
        return res.status(400).json({
            error: 'Los campos nombreCliente y rtn están vacios. Por favor ingrese uno de ambos para realizar la búsqueda.'
        })
    }

    if (!regexRtn.test(rtn.trim())) {
        return res.status(400).json({
            error: 'El RTN debe ser de tipo numérico y no debe contener espacios.'
        })
    }
    next();
}

const validarCamposTalonario = (req, res, next) => {
    const {idTalonario, cai} = req.query;
    const regexId = /^\d+$/

    if (!idTalonario && !cai) {
        return res.status(400).json({
            error: 'Los campos idTalonario y cai están vacios. Por favor ingrese uno de ambos para realizar la búsqueda.'
        })
    }

    if (!cai) {
        if (!regexId.test(idTalonario.trim())) {
            return res.status(400).json({
                error: 'El idTalonario debe ser de tipo numérico y no debe contener espacios.'
            })
        }
    }

    if (cai && idTalonario) {
        if (!regexId.test(idTalonario.trim())) {
            return res.status(400).json({
                error: 'El idTalonario debe ser de tipo numérico y no debe contener espacios.'
            })
        }
    }
    next();
}

module.exports = {
    validarCamposCliente,
    validarCamposTalonario
}