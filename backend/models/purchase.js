// Create global mongoose variable
let mongoose = require("mongoose");
// Methos that creates modules from node/express
let Schema = mongoose.Schema;

// Create the Schema
let purchaseSchema = Schema({
    studentId: {type: Schema.ObjectId, ref: "student"},
    userId: {type: Schema.ObjectId, ref: "purchase"},
    datePurchase: {type: Date, default: Date.now},
});

// Export to module
module.exports = mongoose.model("purchase", purchaseSchema);