// Import Mongoose module
let mongoose = require("mongoose");
// Create user scheme (model)
let Schema = mongoose.Schema;

// Model the Schema
let userSchema = Schema({
    names: String,
    lastName: String,
    age: Number,
    email: String,
    pass: String,
    role: String,
    dateRegistered: {type: Date, default: Date.now}
});

// Export the file
module.exports = mongoose.model("user", userSchema);
