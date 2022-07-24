//const {crearCliente, buscarCliente, buscarClientePorNombre} = require("../controllers/cliente.controller.js")
const controller = require("../controllers/cliente.controller");
const { permisosJwt } = require("../middleware");
const { authJwt } = require("../middleware");
const { verifyClients } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/cliente/crearcliente", [authJwt.verifyToken, verifyClients.validarDuplicadosDniOrEmail], controller.crearCliente);
    app.post("/api/cliente/buscarcliente",[authJwt.verifyToken], controller.buscarCliente);
    app.post("/api/cliente/buscarClientePorNombre",[authJwt.verifyToken], controller.buscarClientePorNombre);
    app.post("/api/cliente/traerTodosLosClientes",[authJwt.verifyToken], controller.traerTodosLosClientes); 
    app.put("/api/cliente/actualizarCliente",[authJwt.verifyToken], controller.actualizarCliente); 
    app.post("/api/cliente/eliminarCliente",[authJwt.verifyToken], controller.eliminarCliente);
};