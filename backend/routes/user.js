// Import Express
let express = require("express");
// Import user controller
let User = require("../controllers/user");

// Create the API
let api = express.Router();

// Create POST service (register) for http://Localhost:3001/
api.post("/registerUser", User.registerUser);
// Create Login service
api.post("/login", User.login);

// Export the module
module.exports = api;