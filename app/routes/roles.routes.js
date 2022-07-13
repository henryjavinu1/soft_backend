const { authJwt } = require("../middleware");
const controller = require("../controllers/roles.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/roles/create",[authJwt.verifyToken,],[permisosJwt.isPermisos("25")], controller.crearol);//crea un rol
  app.post("/api/roles/baja",[authJwt.verifyToken,],[permisosJwt.isPermisos("26")], controller.bajarol);// Le da baja a un rol cambiando el IsDelete
  app.post("/api/roles/update",[authJwt.verifyToken,],[permisosJwt.isPermisos("27")], controller.updaterol);//Actualiza campo rol y descripcion
  app.get("/api/roles/buscarol",[authJwt.verifyToken,],[permisosJwt.isPermisos("28")], controller.buscarol);//trae todos los roles 
  app.get("/api/roles/buscarolname",[authJwt.verifyToken,],[permisosJwt.isPermisos("28")], controller.buscarolname);//trae todos los roles 
};