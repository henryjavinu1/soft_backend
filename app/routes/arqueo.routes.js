const arqueo = require("../controllers/arqueo.controller")
const { permisosJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/arqueo/createArqueo",[permisosJwt.isPermisos("1")], arqueo.createArqueo);
    app.post("/api/arqueo/actualizacionCerrandoSesion",[permisosJwt.isPermisos("2")], arqueo.actualizacionCerrandoSesion);
    app.post("/api/arqueo/deleteArqueo",[permisosJwt.isPermisos("3")], arqueo.deleteArqueo);
    app.post("/api/arqueo/mostrarArqueo",[permisosJwt.isPermisos("4")], arqueo.mostrarArqueo);
    app.post("/api/arqueo/buscarPorFechaInicioFechaFinal",[permisosJwt.isPermisos("4")], arqueo.buscarPorFechaInicioFechaFinal);
    app.post("/api/arqueo/buscarPorUsuario",[permisosJwt.isPermisos("4")], arqueo.buscarPorUsuario);
    app.get("/api/arqueo/createArqueo", arqueo.createArqueo);
    app.get("/api/arqueo/mostrarArqueo", arqueo.mostrarArqueo);

}