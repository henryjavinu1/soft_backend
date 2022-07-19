//const { verifySignUp } = require("../middleware");
const controller = require("../controllers/ventas.controller");
const controller2 = require("../controllers/manipularventa.controller");
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

<<<<<<< HEAD
  app.post("/api/ventas", controller.crearVenta);
  app.get("/api/ventas/traerventas", controller2.findAll);
=======
  app.post("/api/ventas",controller.crearVenta);
  app.post("/api/mostrarVentas",controller.mostrarVentas);
>>>>>>> main
  
};