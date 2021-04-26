// Create global mongoose variable
let mongoose = require("mongoose");
// Methos that creates modules from node/express
let Schema = mongoose.Schema;

// Create the Schema
let courseSchema = Schema({
    names: String,
    description: String,
    image: String,
    subTotal: Number,
    purTotal: Number,
    slots: Number,
    idCategory: { type: Schema.ObjectId, ref: "category" },
    points: Number,
});

// Export to module
module.exports = mongoose.model("course", courseSchema);