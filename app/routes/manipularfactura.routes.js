const { editarFactura, traerFacturas, buscarfactura, buscarFacturaCliente, buscarFacturaFecha, buscarFacturaEmpleado, buscarPorTalonario } = require("../controllers/editfactura.controller");
const { validarCamposTalonario, validarCamposCliente } = require("../middleware/manipularfactura.middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/traerFacturas", traerFacturas);
    app.get("/api/buscarfactura/:id?", buscarfactura);
    app.get("/api/buscarfacturaporcliente/:cliente?", [validarCamposCliente], buscarFacturaCliente);
    app.get("/api/buscarfacturaporfecha/:fecha?", buscarFacturaFecha)
    app.get("/api/buscarfacturaporempleado/:empleado?", buscarFacturaEmpleado)
    app.get("/api/buscarfacturaportalonario/:talonario?", [validarCamposTalonario], buscarPorTalonario)
    app.put("/api/manipularfactura/:id", editarFactura);
  
  };