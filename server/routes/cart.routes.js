const express = require("express");
const db = require("../configuration/dbConfig");
const { AddToCart } = require("../controllers/cart-controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/add-item", verifyToken, AddToCart);

module.exports = router;
