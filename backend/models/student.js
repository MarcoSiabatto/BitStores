// Import Mongoose module
let mongoose = require("mongoose");
// Create user scheme (model)
let Schema = mongoose.Schema;

// Model the Schema
let studentSchema = Schema({
  names: String,
  code: String,
  email: String,
  points: Number,
  dateSignup: { type: Date, default: Date.now },
});

// Export the file
module.exports = mongoose.model("student", studentSchema);
