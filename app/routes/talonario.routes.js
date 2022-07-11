const { authJwt } = require("../middleware");
const controller = require("../controllers/talonario.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/talonarios/create",[authJwt.verifyToken,], controller.createTalonario);    //C
  app.get("/api/talonarios/get",[authJwt.verifyToken,], controller.getTalonarios);          //R
  app.post("/api/talonarios/update",[authJwt.verifyToken,], controller.updateTalonario);    //U
  app.get("/api/talonarios/delete",[authJwt.verifyToken,], controller.deleteTalonario);     //D
};