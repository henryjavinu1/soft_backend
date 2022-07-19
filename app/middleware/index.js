const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const permisosJwt = require("./permisosJwt");
const verifyClients = require("./cliente.middleware");


module.exports = {
  authJwt,
  verifySignUp,
  permisosJwt,
  verifyClients
};
