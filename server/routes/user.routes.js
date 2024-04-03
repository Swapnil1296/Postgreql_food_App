const express = require("express");

const db = require("../configuration/dbConfig.js");
const {
  getUsers,
  SignUpUser,
  LogInUser,
} = require("../controllers/user-controller.js");
const {
  ValidateBodyBeforeSignUp,
  schemas,
} = require("../helpers/auth.validation.js");
const router = express.Router();

router.get("/getuser", getUsers);
router.post(
  "/sign-up",
  ValidateBodyBeforeSignUp(schemas.signUpSchema),
  SignUpUser
);
router.post("/login", LogInUser);

module.exports = router;
