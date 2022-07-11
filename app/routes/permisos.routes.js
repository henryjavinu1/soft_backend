const { authJwt } = require("../middleware");
const controller = require("../controllers/permisos.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/permisos/create",[authJwt.verifyToken], controller.creapermiso);//crea permiso agrega permiso y descripcion
  app.post("/api/permisos/baja",[authJwt.verifyToken], controller.bajapermiso);//baja permiso cambio el valor IsDelete a true
  app.post("/api/permisos/update",[authJwt.verifyToken], controller.updatepermiso);//Actualiza informacion permiso y descripcion 
  app.get("/api/permisos/buscapermiso",[authJwt.verifyToken], controller.buscapermiso);//Trae todos los permisos
  app.get("/api/permisos/buscapermisoname",[authJwt.verifyToken], controller.buscapermisoname);//Trae un permiso por nombre permiso 
};