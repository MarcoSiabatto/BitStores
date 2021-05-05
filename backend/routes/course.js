// Import express
let express = require("express");
// import controller
let Course = require("../controllers/course");
// Import multiparty library to load files to backend
let multiparty = require("connect-multiparty");

// Import path module
let path = multiparty({loads: "./uploads/imgcourse"});

// Generate API with routes
let api = express.Router();

// Generate api routes
api.post("/course/registerCourse", path, Course.registerCourse);
api.get("/course/:names?", Course.listCourse);
api.get("/course/getCourse/:id", Course.getCourse);
api.put("/course/editCourse/:id", path, Course.editCourse);
api.delete("/course/:id", Course.deleteCourse);

// Export module
module.exports = api;
