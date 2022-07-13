const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/user/bajauser",[authJwt.verifyToken],[permisosJwt.isPermisos("42")],controller.bajauser);
};
