const { verifySignUp } = require("../middleware");
const controller = require("../controllers/genefactura.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/traerventa", controller.findVentaDetalle);
  app.post("/api/gene/vertipopago", controller.findTipoPago);
  app.post("/api/gene/generarnumerofactura", controller.findTalonarioFactura);
  app.post("/api/gene/insertfact", controller.insertFactura);

};