const controller = require("../controllers/rolespermiso.controller");



module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/rolpermiso/crearrolpermiso", controller.crearolpermiso);
    /*app.post("/api/cliente/buscarcliente", controller.buscarCliente);
    app.post("/api/cliente/buscarClientePorNombre", controller.buscarClientePorNombre);
    app.post("/api/cliente/traerTodosLosClientes", controller.traerTodosLosClientes); 
    app.put("/api/cliente/actualizarCliente", controller.actualizarCliente); 
    app.post("/api/cliente/eliminarCliente", controller.eliminarCliente);*/
};