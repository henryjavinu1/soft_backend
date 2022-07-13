const { verifySignUp } = require("../middleware");
const controller = require("../controllers/genefactura.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/traerventa",[permisosJwt.isPermisos("13")], controller.findVentaDetalle); //Busca la venta y retorna los datos relevantes para la
  app.post("/api/gene/vertipopago",[permisosJwt.isPermisos("4")], controller.findTipoPago);
  app.post("/api/gene/insertfact",[permisosJwt.isPermisos("15")], controller.insertFactura);
  app.post("/api/gene/convertirString",[permisosJwt.isPermisos("16")], controller.convertirString); //Genera numumero factura y lo ingresa en tabla numero
  //app.post("/api/gene/buscar", controller.buscar); // Apoyo

};