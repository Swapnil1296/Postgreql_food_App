const express = require("express");
const db = require("../configuration/dbConfig");
const {
  AddToCart,
  getCartItem,
  updateQuantity,
  addCustomerAddress,
  getCustomerAddress,
  updateCustomerAddress,
} = require("../controllers/cart-controller");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/add-item", verifyToken, AddToCart);
router.get("/get-cart/:userId", verifyToken, getCartItem);
router.put("/update-quantity/:itemId/:userId", verifyToken, updateQuantity);
router.post("/add-customer-address/:userId", verifyToken, addCustomerAddress);
router.get("/get-customer-address/:userId", verifyToken, getCustomerAddress);
router.put(
  "/update-customer-address/:userId",
  verifyToken,
  updateCustomerAddress
);

module.exports = router;
