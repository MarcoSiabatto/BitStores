let express = require("express");
let Student = require("../controllers/student");

let api = express.Router();

api.post("/student/registerStudent", Student.registerStudent);
api.get("/student", Student.listStudent);
api.get("/student/:id", Student.findStudent);
api.put("/student/editStudent/:id", Student.editStudent);
api.delete("/student/deleteStudent/:id", Student.deleteStudent);

module.exports = api;
