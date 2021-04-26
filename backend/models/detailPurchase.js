// Import Mongoose module
let mongoose = require("mongoose");
// Create user scheme (model)
let Schema = mongoose.Schema;

// Model the Schema
let detailPurchaseSchema = Schema({
    courseId: {type: Schema.ObejctId, ref: "course"},
    purchaseId: {type: Schema.ObejctId, ref: "purhcase"},
    quantity: Number,
});

// Export the file
module.exports = mongoose.model("detailPurchase", detailPurchaseSchema);