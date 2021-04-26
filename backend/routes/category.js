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

// Export module
module.exports = api;

/* // importamos express
let express = require("express");
// importamos el controlador de categoria
let Categoria = require("../controllers/categoria");

// Creamos la api para controlar las rutas
let api = express.Router();

// Rutas de la API
api.post("/categoria/registrarCategoria", Categoria.registrarCategoria);
api.get("/categoria/:id", Categoria.buscarCategoria);
api.get("/categoria/:nombre?", Categoria.listaCategoria);
api.post("/categoria/:nombre?", Categoria.listaCategoria);

// Exportamos el modulo
module.exports = api;
 */
