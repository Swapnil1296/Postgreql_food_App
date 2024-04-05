const express = require("express");
const db = require("../configuration/dbConfig");
const {
  AddToCart,
  getCartItem,
  updateQuantity,
} = require("../controllers/cart-controller");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/add-item", verifyToken, AddToCart);
router.get("/get-cart/:userId", verifyToken, getCartItem);
router.put("/update-quantity/:itemId/:userId", verifyToken, updateQuantity);
module.exports = router;
