const { verifySignUp } = require("../middleware");
const controller = require("../controllers/imagenproducto.controller");
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
  app.post("/api/imagenproducto/crearimagenproducto", controller.upload, controller.createimage);
  app.post("/api/imagenproducto/buscarimagenes", controller.findOne);
};