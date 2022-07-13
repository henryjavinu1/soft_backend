//const {crearCliente, buscarCliente, buscarClientePorNombre} = require("../controllers/cliente.controller.js")
const controller = require("../controllers/cliente.controller");
const { permisosJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/cliente/crearcliente",[permisosJwt.isPermisos("5")], controller.crearCliente);
    app.post("/api/cliente/buscarcliente",[permisosJwt.isPermisos("8")], controller.buscarCliente);
    app.post("/api/cliente/buscarClientePorNombre",[permisosJwt.isPermisos("8")], controller.buscarClientePorNombre);
    app.post("/api/cliente/traerTodosLosClientes",[permisosJwt.isPermisos("8")], controller.traerTodosLosClientes); 
    app.put("/api/cliente/actualizarCliente",[permisosJwt.isPermisos("6")], controller.actualizarCliente); 
    app.post("/api/cliente/eliminarCliente",[permisosJwt.isPermisos("7")], controller.eliminarCliente);
};