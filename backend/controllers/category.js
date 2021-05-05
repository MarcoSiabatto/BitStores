// import category model
let Category = require("../models/category");
// Import mongoose
let mongoose = require("mongoose");

// Register a Category
const registerCategory = async (req, res) => {
  // Obtain data from JSON
  let params = req.body;
  // Validate that all parameters are there
  if (!params.names || !params.description) {
    // If there is data missing throw response
    return res.status(401).send({ FrontError: "You are missing information" });
  } else {
    // Assign parameters to model's new instance
    let category = new Category({
      names: params.names,
      description: params.description,
    });
    // Register category with Await
    const result = await category.save();
    // Validate result with ternary operator
    result
      ? res.status(200).send({ category: result })
      : res.status(401).send({ Error: "Could not register category" });
  }
};

// Search categories
const searchCategory = async (req, res) => {
  // Validate that incoming ID is valid for MongoDB
  let validId = mongoose.Types.ObjectId.isValid(req.params["id"]);
  if (!validId) {
    return res.status(400).send({ Error: "ID format is not valid" });
  } else {
    let category = await Category.findById(req.params["id"]);
    category
      ? res.status(200).send({ category: category })
      : res
          .status(401)
          .send({ message: "Category not found or does not exist" });
  }
};

// List categories with or without filter
const listCategory = async (req, res) => {
  // Search in the categories
  let category = await Category.find({
    names: new RegExp(req.params["names"], "i"),
  });
  if (!category || category.length === 0) {
    return res.status(400).send({ Error: "Category not found" });
  } else {
    return res.status(200).send({ Categories: category });
  }
};

// Edit Category
const editCategory = (req, res) => {
  // Obtain the id of the category
  let id = req.params["id"];
  // Obtain the incoming data to edit from API
  let params = req.body;
  // Search by id and edit
  Category.findByIdAndUpdate(
    { _id: id },
    { names: params.names, description: params.description },
    (err, categoryData) => {
      if (err) {
        res.status(500).send({ message: "Error connecting to the server" });
      } else {
        if (categoryData) {
          res.status(200).send({ category: categoryData });
        } else {
          res.status(401).send({ message: "Category could not be edited" });
        }
      }
    }
  );
};

// Eliminate a Category
const eliminateCategory = (req, res) => {
  // Obtain the id
  let id = req.params["id"];
  // Eliminate the category by ID
  Category.findByIdAndDelete({ _id: id }, (err, categoryData) => {
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (categoryData) {
        res.status(200).send({ category: categoryData });
      } else {
        res.status(401).send({ message: "Category could not be edited" });
      }
    }
  });
};

const categoryController = {
  registerCategory,
  searchCategory,
  listCategory,
  editCategory,
  eliminateCategory,
};
// Export module
module.exports = categoryController;
