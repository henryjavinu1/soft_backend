const { authJwt } = require("../middleware");
const controller = require("../controllers/talonario.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/talonarios/create", controller.createTalonario);    //C
  app.get("/api/talonarios/get", controller.getTalonarios);          //R
  app.post("/api/talonarios/update", controller.updateTalonario);    //U
  app.get("/api/talonarios/delete", controller.deleteTalonario);     //D
  app.post("/api/talonarios/activate", controller.activateTalonario);     
  app.post("/api/talonarios/disactivate", controller.disactivateTalonario);     
};