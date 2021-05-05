// Import express
let express = require("express");
// Import category controller
let Category = require("../controllers/category");

// Create the API to control routes
let api = express.Router();

// Api Routes
api.post("/category/registerCategory", Category.registerCategory);
api.get("/category/:id", Category.searchCategory);
api.get("/category/:names?", Category.listCategory);
api.post("/category/:names?", Category.listCategory);
api.put("/category/editCategory/:id", Category.editCategory);
api.delete("/category/eliminateCategory/:id", Category.eliminateCategory);

// Export module
module.exports = api;

