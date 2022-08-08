const { verifySignUp } = require("../middleware");
const controller = require("../controllers/genefactura.controller");
const { permisosJwt } = require("../middleware");
const { authJwt } = require("../middleware");
const { editarFactura, traerFacturas, buscarfactura, buscarFacturaCliente, buscarFacturaFecha, buscarFacturaEmpleado, buscarPorTalonario, imprimirUnaFactura, descargarFactura } = require("../controllers/editfactura.controller");
const { validarCamposTalonario, validarCamposCliente, validarCamposFecha, validarCamposIdEmpleado, validarCamposNumeroFactura } = require("../middleware/manipularfactura.middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/vertipopago",controller.findTipoPago); //Vertipo de pagos
  app.post("/api/gene/insertfact", controller.insertFactura); //Insertar factura
  app.post("/api/gene/buscar", controller.buscar); // Apoyo
  app.post("/api/gene/nuevo", controller.nuevo); //Generar numero factura

};