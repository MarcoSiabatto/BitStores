// Import express
let express = require("express");
// import controller
let Course = require("../controllers/course");

// Generate API with routes
let api = express.Router();

// Generate api routes
api.post("/course/registerCourse", Course.registerCourse);

// Export module
module.exports = api;
