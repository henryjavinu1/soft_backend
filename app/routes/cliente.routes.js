//const {crearCliente, buscarCliente, buscarClientePorNombre} = require("../controllers/cliente.controller.js")
const controller = require("../controllers/cliente.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/cliente/crearcliente", controller.crearCliente);
    app.get("/api/cliente/buscarcliente", controller.buscarCliente);
    app.get("/api/cliente/buscarClientePorNombre", controller.buscarClientePorNombre);
    app.get("/api/cliente/traerTodosLosClientes", controller.traerTodosLosClientes); 
    app.put("/api/cliente/actualizarCliente", controller.actualizarCliente); 
};