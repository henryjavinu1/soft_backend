const controller = require("../controllers/sucursal.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/sucursales/get", controller.getSucursal);
  app.get("/api/sucursales/getAll", controller.getSucursales);
  app.post("/api/sucursales/update", controller.updateSucursal);   
};