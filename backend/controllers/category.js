// import category model
let Category = require("../models/category");

// Register a Category
const registerCategory = (req, res) => {
  // Obtain data from JSON
  let params = req.body;
  // Create new instance for category
  let category = new Category();
  // Save incoming request data into collection
  category.names = params.names;
  category.description = params.description;
  // Save the info into MongoDB
  category.save((err, saveCategory) => {
    // If an error comes in from Mongo Server
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (saveCategory) {
        res.status(200).send({ category: saveCategory });
      } else {
        res.status(401).send({ message: "Could not register category" });
      }
    }
  });
};

// Search categories
const searchCategory = (req, res) => {
  // Obtain ID from category
  let id = req.params["id"];
  // Search for the category by its ID
  Category.findById({ _id: id }, (err, categoryData) => {
    // If error when connecting to DB
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res
          .status(401)
          .send({ message: "Category not found or does not exist" });
      }
    }
  });
};

// List categories with or without filter
const listCategory = (req, res) => {
// If we filter by name save it
  let names = req.params["names"];
// Search in the categories
  Category.find({names: new RegExp(names, "i")}, (err, categoryData)=>{
    // If error when connecting to DB
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res
          .status(401)
          .send({ message: "Category not found or does not exist" });
      }
    }
  });
};

// Export module
module.exports = {
  registerCategory,
  searchCategory,
  listCategory,
};

/* // Importamos el modelo categoria
let Categoria = require("../models/categoria");

// Registramos categoria POST
const registrarCategoria = (req, res) => {
  // obtenemos los datos del JSON
  let params = req.body;
  // Creamos nueva instancia de categoria
  let categoria = new Categoria();
  // guardamos los datos del req en la coleccion
  categoria.nombre = params.nombre;
  categoria.descripcion = params.descripcion;
  // save - guardamos la info en mongoDB
  categoria.save((err, saveCategoria) => {
    // si llega un error desde el servidor de mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveCategoria) {
        res.status(200).send({ categoria: saveCategoria });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar la categoria" });
      }
    }
  });
};

// Buscar categorias
const buscarCategoria = (req, res) => {
  // obtenemos el id de la categoria
  let id = req.params["id"];
  // buscamos la categoria por el ID
  Categoria.findById({ _id: id }, (err, datosCategoria) => {
    // si hay error al conectar con mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosCategoria) {
        res.status(200).send({ categoria: datosCategoria });
      } else {
        res.status(401).send({ mensaje: "La categoria no existe" });
      }
    }
  });
};

// Listar categorias con o sin filtro
const listaCategoria = (req, res) => {
  // si tenemos filtro nombre lo guardamos
  let nombre = req.params["nombre"];
  // Busqueda de las categorias
  Categoria.find({ nombre: new RegExp(nombre, "i") }, (err, datosCategoria) => {
    // si hay error al conectar con mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosCategoria) {
        res.status(200).send({ categoria: datosCategoria });
      } else {
        res.status(401).send({ mensaje: "No hay categorias" });
      }
    }
  });
};

module.exports = {
  registrarCategoria,
  buscarCategoria,
  listaCategoria,
};
 */
