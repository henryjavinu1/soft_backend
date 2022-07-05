const { authJwt } = require("../middleware");
const controller = require("../controllers/roles.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/roles/create",[authJwt.verifyToken,], controller.crearol);
};