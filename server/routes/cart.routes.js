const express = require("express");
const db = require("../configuration/dbConfig");
const {
  AddToCart,
  getCartItem,
  updateQuantity,
  addCustomerAddress,
} = require("../controllers/cart-controller");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/add-item", verifyToken, AddToCart);
router.get("/get-cart/:userId", verifyToken, getCartItem);
router.put("/update-quantity/:itemId/:userId", verifyToken, updateQuantity);
router.post("/add-customer-address/:userId", verifyToken, addCustomerAddress);
module.exports = router;
