const { verifySignUp } = require("../middleware");
const controller = require("../controllers/tipopago.controller");
const controller2 = require("../controllers/manipularventa.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/insertartipopago", controller.insertarTipoPago); // Apoyo
    app.post("/api/gene/actualizartipopago",   controller.updateTipoPago);
    app.get("/api/gene/buscartipopago", controller.findTipoPago);
    app.post("/api/gene/buscartipopagoid", controller.findTipoPagoid);
    app.post("/api/gene/eliminartipopago",  controller.deleteTipoPago);
    app.get("/api/mostrarventas", controller2.findAllVenta);

};