const { cliente } = require("../models/puntoDeVentas");
const db = require("../models/puntoDeVentas");
const Cliente = db.cliente;

validarDuplicadosDniOrEmail = async (req, res, next) => {
    try {
        //DNI
        let cliente = await Cliente.findOne({
            where: {
                dni: req.body.dni
            }
        });
        if(cliente){
            return res.status(400).send({
                message: "Error, DNI ya existe"
            });
        }
        //EMAIL
         cliente = await Cliente.findOne({
            where: {
              email: req.body.email
            }
          });
      
          if (cliente) {
            return res.status(400).send({
              message: "Error! La direccion de correo ya existe!"
            });
          }
        //RTN
        //  cliente = await Cliente.findOne({
        //     where: {
        //       rtn: req.body.rtn
        //     }
        //   });
      
        //   if (cliente) {
        //     return res.status(400).send({
        //       message: "Error! el RTN ya existe!"
        //     });
        //   }
        next();
    }
    catch(error){
        return res.status(500).send({
            message : error.message
        });

    }
};

const verifyClients = {
    validarDuplicadosDniOrEmail,
}

module.exports = verifyClients;