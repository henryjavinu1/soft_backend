//
const controller = require("../controllers/empleado.controller.js");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/empleado/crearempleado", controller.crearEmpleado);
    app.get("/api/empleado/buscarempleado", controller.buscarEmpleado);
    app.get("/api/empleado/buscarEmpleadoPorNombre", controller.buscarEmpleadoPorNombre);
    app.get("/api/empleado/traerTodosLosEmpleados", controller.traerTodosLosEmpleados); 
    app.put("/api/empleado/actualizarEmpleado", controller.actualizarEmpleado); 
    app.post("/api/empleado/eliminarEmpleado", controller.eliminarEmpleado);
};