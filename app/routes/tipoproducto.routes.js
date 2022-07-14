const { verifySignUp } = require("../middleware");
const controller = require("../controllers/tipoproducto.controller");
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

  app.post("/api/producto/tipoproducto",[authJwt.verifyToken,],[permisosJwt.isPermisos("37")], controller.createtipoproducto);
  app.post("/api/producto/buscartipo",[authJwt.verifyToken,],[permisosJwt.isPermisos("40")], controller.findOne);
  app.get("/api/producto/mostrartipos",[authJwt.verifyToken,],[permisosJwt.isPermisos("40")], controller.findAll);
  app.post("/api/producto/actualizartipo",[authJwt.verifyToken,],[permisosJwt.isPermisos("38")], controller.update);
  app.post("/api/producto/eliminartipo",[authJwt.verifyToken,],[permisosJwt.isPermisos("39")], controller.delete);

};
