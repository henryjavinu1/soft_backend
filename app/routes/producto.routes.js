const { verifySignUp } = require("../middleware");
const controller = require("../controllers/producto.controller");
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

  app.post("/api/producto/crearproducto",[authJwt.verifyToken,],[permisosJwt.isPermisos("21")], controller.createproducto);
  app.post("/api/producto/buscarproducto",[authJwt.verifyToken,],[permisosJwt.isPermisos("24")], controller.findOne);
  app.get("/api/producto/mostrarproductos",[authJwt.verifyToken,],[permisosJwt.isPermisos("24")], controller.findAll);
  app.post("/api/producto/actualizarproducto",[authJwt.verifyToken,],[permisosJwt.isPermisos("22")], controller.update);
  app.post("/api/producto/eliminarproducto",[authJwt.verifyToken,],[permisosJwt.isPermisos("23")], controller.delete);
  app.post("/api/producto/buscarproductoxcodigo",[authJwt.verifyToken,],[permisosJwt.isPermisos("24")], controller.buscarxcodigo);
  

};