const { verifySignUp } = require("../middleware");
const controller = require("../controllers/producto.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/producto/crearproducto",[permisosJwt.isPermisos("21")], controller.createproducto);
  app.post("/api/producto/buscarproducto",[permisosJwt.isPermisos("24")], controller.findOne);
  app.get("/api/producto/mostrarproductos",[permisosJwt.isPermisos("24")], controller.findAll);
  app.post("/api/producto/actualizarproducto",[permisosJwt.isPermisos("22")], controller.update);
  app.post("/api/producto/eliminarproducto",[permisosJwt.isPermisos("23")], controller.delete);
  app.post("/api/producto/buscarproductoxcodigo",[permisosJwt.isPermisos("24")], controller.buscarxcodigo);
  

};