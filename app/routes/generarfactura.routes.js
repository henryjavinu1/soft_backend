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

  app.post("/api/gene/traerventa", controller.findVentaDetalle); //Busca la venta y retorna los datos relevantes para la
  app.post("/api/gene/vertipopago",controller.findTipoPago);
  app.post("/api/gene/insertfact", controller.insertFactura);
  //app.post("/api/gene/convertirString", controller.convertirString); //Genera numumero factura y lo ingresa en tabla numero
  app.post("/api/gene/buscar", controller.buscar); // Apoyo
  app.post("/api/gene/nuevo", controller.nuevo);
  

 

};