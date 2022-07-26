const { editarFactura, traerFacturas, buscarfactura, buscarFacturaCliente, buscarFacturaFecha, buscarFacturaEmpleado, buscarPorTalonario, imprimirUnaFactura, descargarFactura } = require("../controllers/editfactura.controller");
const { verifyToken } = require("../middleware/authJwt");
const { validarCamposTalonario, validarCamposCliente, validarCamposFecha, validarCamposIdEmpleado, validarCamposNumeroFactura } = require("../middleware/manipularfactura.middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/traerFacturas", [verifyToken], traerFacturas);
    app.get("/api/buscarfactura/:id?", [validarCamposNumeroFactura], buscarfactura);
    app.get("/api/buscarfacturaporcliente/:cliente?", [validarCamposCliente], buscarFacturaCliente);
    app.get("/api/buscarfacturaporfecha/:fecha?", [validarCamposFecha], buscarFacturaFecha);
    app.get("/api/buscarfacturaporempleado/:empleado?", [validarCamposIdEmpleado], buscarFacturaEmpleado);
    app.get("/api/buscarfacturaportalonario/:talonario?", [validarCamposTalonario], buscarPorTalonario);
    app.put("/api/manipularfactura/:id", editarFactura);
    app.get("/api/traerunafactura/:id?", imprimirUnaFactura);
    app.get("/api/descargardactura/:numerofactura?", descargarFactura);
  
  };