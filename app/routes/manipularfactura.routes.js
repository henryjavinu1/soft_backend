const { editarFactura, traerFacturas } = require("../controllers/editfactura.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/manipularfactura", traerFacturas)
    app.put("/api/manipularfactura/:id", editarFactura)
  
  };