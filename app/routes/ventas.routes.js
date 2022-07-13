//const { verifySignUp } = require("../middleware");
const controller = require("../controllers/ventas.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ventas",[permisosJwt.isPermisos("43")], controller.crearVenta);
  
};