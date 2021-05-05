// Import Mongoose module
let mongoose = require("mongoose");
// Create user scheme (model)
let Schema = mongoose.Schema;

// Model the Schema
let detailPurchaseSchema = Schema({
  courseId: { type: Schema.ObjectId, ref: "course" },
  purchaseId: { type: Schema.ObjectId, ref: "purchase" },
  quantity: Number,
});

// Export the file
module.exports = mongoose.model("detailPurchase", detailPurchaseSchema);
