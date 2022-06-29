//crear una ruta para el arqueo
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    }).post("/api/arqueo/", [authJwt.verifyToken], arqueo.create);
}