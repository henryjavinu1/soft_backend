const { editarFactura, traerFacturas, buscarfactura, buscarFacturaCliente, buscarFacturaFecha, buscarFacturaEmpleado } = require("../controllers/editfactura.controller");

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
    app.get("/api/buscarfacturaporcliente/:cliente?", buscarFacturaCliente);
    app.get("/api/buscarfacturaporfecha/:fecha?", buscarFacturaFecha)
    app.get("/api/buscarfacturaporempleado/:empleado?", buscarFacturaEmpleado)
    app.put("/api/manipularfactura/:id", editarFactura);
  
  };