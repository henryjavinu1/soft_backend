const controller = require("../controllers/arqueo.controller");
const { verifyToken } = require("../middleware/authJwt");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/arqueo/createArqueo",                    [verifyToken], controller.createArqueo);
    app.post("/api/arqueo/actualizacionCerrandoSesion",     [verifyToken], controller.actualizacionCerrandoSesion);
    app.post("/api/arqueo/deleteArqueo",                    [verifyToken], controller.deleteArqueo);
    app.post("/api/arqueo/mostrarArqueo",                   [verifyToken], controller.mostrarArqueo);
    app.post("/api/arqueo/buscarPorFechaInicioFechaFinal",  [verifyToken], controller.buscarPorFechaInicioFechaFinal);
    app.post("/api/arqueo/buscarPorUsuario",                [verifyToken], controller.buscarPorUsuario);
    app.post("/api/arqueo/validarArqueoActivo",             [verifyToken], controller.validarArqueoActivo);

};