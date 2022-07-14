//const {crearCliente, buscarCliente, buscarClientePorNombre} = require("../controllers/cliente.controller.js")
const controller = require("../controllers/cliente.controller");
const { permisosJwt } = require("../middleware");
const { authJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/cliente/crearcliente",[authJwt.verifyToken,],[permisosJwt.isPermisos("5")], controller.crearCliente);
    app.post("/api/cliente/buscarcliente",[authJwt.verifyToken,],[permisosJwt.isPermisos("8")], controller.buscarCliente);
    app.post("/api/cliente/buscarClientePorNombre",[authJwt.verifyToken,],[permisosJwt.isPermisos("8")], controller.buscarClientePorNombre);
    app.post("/api/cliente/traerTodosLosClientes",[authJwt.verifyToken,],[permisosJwt.isPermisos("8")], controller.traerTodosLosClientes); 
    app.put("/api/cliente/actualizarCliente",[authJwt.verifyToken,],[permisosJwt.isPermisos("6")], controller.actualizarCliente); 
    app.post("/api/cliente/eliminarCliente",[authJwt.verifyToken,],[permisosJwt.isPermisos("7")], controller.eliminarCliente);
};