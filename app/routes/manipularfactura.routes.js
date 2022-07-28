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
  
    app.post("/api/traerFacturas", [verifyToken], traerFacturas);
    app.post("/api/buscarfactura/:id?", [validarCamposNumeroFactura, verifyToken], buscarfactura);
    app.post("/api/buscarfacturaporcliente/:cliente?", [validarCamposCliente, verifyToken], buscarFacturaCliente);
    app.post("/api/buscarfacturaporfecha/:fecha?", [validarCamposFecha, verifyToken], buscarFacturaFecha);
    app.post("/api/buscarfacturaporempleado/:empleado?", [validarCamposIdEmpleado, verifyToken], buscarFacturaEmpleado);
    app.post("/api/buscarfacturaportalonario/:talonario?", [validarCamposTalonario, verifyToken], buscarPorTalonario);
    app.put("/api/manipularfactura/:id", editarFactura);
    app.post("/api/traerunafactura/:id?", [verifyToken], imprimirUnaFactura);
    app.get("/api/descargardactura/:numerofactura?", descargarFactura);
  
  };