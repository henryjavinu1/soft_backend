const { verifySignUp } = require("../middleware");
const controller = require("../controllers/tipopago.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/insertartipopago",[permisosJwt.isPermisos("33")], controller.insertarTipoPago); // Apoyo
    app.post("/api/gene/actualizartipopago",[permisosJwt.isPermisos("34")], controller.updateTipoPago);
    app.get("/api/gene/buscartipopago",[permisosJwt.isPermisos("36")], controller.findTipoPago);
    app.post("/api/gene/buscartipopagoid",[permisosJwt.isPermisos("36")], controller.findTipoPagoid);
    app.post("/api/gene/eliminartipopago",[permisosJwt.isPermisos("35")], controller.deleteTipoPago);

};