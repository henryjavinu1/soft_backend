const arqueo = require("../controllers/arqueo.controller")
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/arqueo/createArqueo", arqueo.createArqueo);
    app.post("/api/arqueo/actualizacionCerrandoSesion", arqueo.actualizacionCerrandoSesion);
    app.post("/api/arqueo/deleteArqueo", arqueo.deleteArqueo);
    app.post("/api/arqueo/mostrarArqueo", arqueo.mostrarArqueo);
    app.post("/api/arqueo/buscarPorFechaInicioFechaFinal", arqueo.buscarPorFechaInicioFechaFinal);
    app.post("/api/arqueo/buscarPorUsuario", arqueo.buscarPorUsuario);

}