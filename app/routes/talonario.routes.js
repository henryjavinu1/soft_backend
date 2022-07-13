const { authJwt } = require("../middleware");
const controller = require("../controllers/talonario.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/talonarios/create",[authJwt.verifyToken,],[permisosJwt.isPermisos("29")], controller.createTalonario);    //C
  app.get("/api/talonarios/get",[authJwt.verifyToken,],[permisosJwt.isPermisos("32")], controller.getTalonarios);          //R
  app.post("/api/talonarios/update",[authJwt.verifyToken,],[permisosJwt.isPermisos("30")], controller.updateTalonario);    //U
  app.get("/api/talonarios/delete",[authJwt.verifyToken,],[permisosJwt.isPermisos("31")], controller.deleteTalonario);     //D
};