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

  app.post("/api/producto/crearproducto", controller.createproducto);
  app.post("/api/producto/buscarproducto", controller.findOne);
  app.get("/api/producto/mostrarproductos", controller.findAll);
  app.post("/api/producto/actualizarproducto", controller.update);
  app.post("/api/producto/eliminarproducto", controller.delete);
  app.post("/api/producto/restarsaldo", controller.setsaldo);
  app.post("/api/producto/buscarproductoxcodigo", controller.buscarxcodigo);
  

};