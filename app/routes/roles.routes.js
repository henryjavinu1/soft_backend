const { authJwt } = require("../middleware");
const controller = require("../controllers/roles.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/roles/create",[authJwt.verifyToken,], controller.crearol);//crea un rol
  app.post("/api/roles/baja",[authJwt.verifyToken,], controller.bajarol);// Le da baja a un rol cambiando el IsDelete
  app.post("/api/roles/update",[authJwt.verifyToken,], controller.updaterol);//Actualiza campo rol y descripcion
};