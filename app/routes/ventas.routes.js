//const { verifySignUp } = require("../middleware");
const controller = require("../controllers/ventas.controller");
const manipularventa = require("../controllers/manipularventa.controller");
const { permisosJwt } = require("../middleware");
const { authJwt } = require("../middleware");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ventas", [verifyToken], controller.crearVenta);
  app.post("/api/mostrarVentas",controller.mostrarVentas);
  app.post("/api/procesarVenta", controller.eliminarVentaProcesar);
  app.post("/api/eliminarVenta", [verifyToken], controller.eliminarVenta);
  app.post("/api/actualizarVenta", controller.actualizarVenta);
  app.post("/api/detalleVentaDetalladas", [verifyToken], manipularventa.findAllVenta);
  
};