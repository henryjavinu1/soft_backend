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
  app.post("/api/roles/create", controller.crearol);//crea un rol
  app.post("/api/roles/bajarol", controller.bajarol);// Le da baja a un rol cambiando el IsDelete
  app.put("/api/roles/updaterol", controller.updateRol);//Actualiza campo rol y descripcion
  app.get("/api/roles/buscarol", controller.buscarol);//trae todos los roles 
  app.get("/api/roles/buscarolname",[authJwt.verifyToken,],[permisosJwt.isPermisos("28")], controller.buscarolname);//trae todos los roles 
  app.post("/api/roles/mostrarroles", controller.mostrarRol);//muestra todos los roles
};