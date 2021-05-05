let express = require("express");
let Purchase = require("../controllers/purchase");

let api = express.Router();

api.post("/purchase/makePurchase", Purchase.makePurchase);
api.get("/purchase/:id", Purchase.purchaseData);
api.get("/purchase/", Purchase.listPurchase);
api.get("/purchase/details/:id", Purchase.purchaseDetails);

module.exports = api;
