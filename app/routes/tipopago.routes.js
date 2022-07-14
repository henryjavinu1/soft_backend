const { verifySignUp } = require("../middleware");
const controller = require("../controllers/tipopago.controller");
const { permisosJwt } = require("../middleware");
const { authJwt } = require("../middleware");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/gene/insertartipopago",[authJwt.verifyToken,],[permisosJwt.isPermisos("33")], controller.insertarTipoPago); // Apoyo
    app.post("/api/gene/actualizartipopago",[authJwt.verifyToken,],[permisosJwt.isPermisos("34")], controller.updateTipoPago);
    app.get("/api/gene/buscartipopago",[authJwt.verifyToken,],[permisosJwt.isPermisos("36")], controller.findTipoPago);
    app.post("/api/gene/buscartipopagoid",[authJwt.verifyToken,],[permisosJwt.isPermisos("36")], controller.findTipoPagoid);
    app.post("/api/gene/eliminartipopago",[authJwt.verifyToken,],[permisosJwt.isPermisos("35")], controller.deleteTipoPago);

};