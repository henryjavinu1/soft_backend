const { authJwt } = require("../middleware");
const controller = require("../controllers/permisos.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/permisos/",[authJwt.verifyToken], permisos.create);
};