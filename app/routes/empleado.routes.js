//
const controller = require("../controllers/empleado.controller.js");
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
      
    app.post("/api/empleado/crearempleado",[authJwt.verifyToken,],[permisosJwt.isPermisos("9")], controller.crearEmpleado);
    app.post("/api/empleado/buscarempleado",[authJwt.verifyToken,],[permisosJwt.isPermisos("12")], controller.buscarEmpleado);
    app.post("/api/empleado/buscarEmpleadoPorNombre",[authJwt.verifyToken,],[permisosJwt.isPermisos("12")], controller.buscarEmpleadoPorNombre);
    app.post("/api/empleado/traerTodosLosEmpleados",[authJwt.verifyToken,],[permisosJwt.isPermisos("12")], controller.traerTodosLosEmpleados); 
    app.put("/api/empleado/actualizarEmpleado",[authJwt.verifyToken,],[permisosJwt.isPermisos("10")], controller.actualizarEmpleado); 
    app.post("/api/empleado/eliminarEmpleado",[authJwt.verifyToken,],[permisosJwt.isPermisos("11")], controller.eliminarEmpleado);
};