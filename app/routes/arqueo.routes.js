const controller = require("../controllers/arqueo.controller")
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/arqueo/createArqueo", controller.createArqueo);
    app.put("/api/arqueo/actualizacionCerrandoSesion", controller.actualizacionCerrandoSesion);
    app.post("/api/arqueo/deleteArqueo", controller.deleteArqueo);
    app.post("/api/arqueo/mostrarArqueo", controller.mostrarArqueo);
    app.post("/api/arqueo/buscarPorFechaInicioFechaFinal", controller.buscarPorFechaInicioFechaFinal);
    app.post("/api/arqueo/buscarPorUsuario", controller.buscarPorUsuario);

};