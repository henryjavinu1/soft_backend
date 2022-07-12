const { verifySignUp } = require("../middleware");
const controller = require("../controllers/tipoproducto.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/producto/tipoproducto", controller.createtipoproducto);
  app.post("/api/producto/buscartipo", controller.findOne);
  app.get("/api/producto/mostrartipos", controller.findAll);
  app.post("/api/producto/actualizartipo", controller.update);
  app.post("/api/producto/eliminartipo", controller.delete);

};
