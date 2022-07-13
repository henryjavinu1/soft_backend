//
const controller = require("../controllers/empleado.controller.js");
const { permisosJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
      
    app.post("/api/empleado/crearempleado",[permisosJwt.isPermisos("9")], controller.crearEmpleado);
    app.post("/api/empleado/buscarempleado",[permisosJwt.isPermisos("12")], controller.buscarEmpleado);
    app.post("/api/empleado/buscarEmpleadoPorNombre",[permisosJwt.isPermisos("12")], controller.buscarEmpleadoPorNombre);
    app.post("/api/empleado/traerTodosLosEmpleados",[permisosJwt.isPermisos("12")], controller.traerTodosLosEmpleados); 
    app.put("/api/empleado/actualizarEmpleado",[permisosJwt.isPermisos("10")], controller.actualizarEmpleado); 
    app.post("/api/empleado/eliminarEmpleado",[permisosJwt.isPermisos("11")], controller.eliminarEmpleado);
};