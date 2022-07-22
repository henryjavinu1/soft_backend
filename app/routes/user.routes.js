const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const controllerauth = require("../controllers/auth.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/user/bajauser",controller.bajauser);
  app.post("/api/user/crearuser", controllerauth.signup);
  app.post("/api/user/mostraruser",controller.mostrarUser);
};
