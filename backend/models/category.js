// Create global mongoose variable
let mongoose = require("mongoose");
// Methos that creates modules from node/express
let Schema = mongoose.Schema;

// Create the Schema
let categorySchema = Schema({
    names: String,
    description: String,
});

// Export to module
module.exports = mongoose.model("category", categorySchema);