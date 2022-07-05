const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const init = require("./app/config/init.config");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "soft-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models/puntoDeVentas/");
db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  init.initial();
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido!" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/generarfactura.routes")(app);
require("./app/routes/manipularfactura.routes")(app);
require("./app/routes/arqueo.routes")(app);
require("./app/routes/tipopago.routes")(app);
// require("./app/routes/permisos.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

