const userModal = require("../models/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      await userModal.GetAllUser().then((data) => {
        console.log("data in controller:", data.rows);
        res
          .status(200)
          .json({
            status: 1,
            data: data.rows,
          })
          .end();
      });
    } catch (error) {
      console.log("err controller 111:-", err);
      res
        .status(400)
        .json({
          status: 3,
          message: err.message,
        })
        .end();
    }
  },
  SignUpUser: async (req, res, next) => {
    try {
      const {
        user_name,
        user_email,
        user_phone,
        user_address,
        user_profile,
        password,
      } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const userInfo = {
        name: user_name,
        email: user_email,
        phone: user_phone,
        address: user_address ?? null,
        profile_name: user_profile,
        password: hashedPassword,
      };

      // Call the loginUser function which should return the user details upon successful login
      await userModal.SignUpUser(userInfo);
      // Generate JWT token

      res.status(200).json({
        status: 1,
        message: "User signed up successfully",

        user: {
          name: user_name,
          email: user_email,
          phone: user_phone,
          address: user_address,
          profile_name: user_profile,
        },
      });
    } catch (error) {
      next(errorHandler(400, error.message));
    }
  },
  LogInUser: async (req, res, next) => {
    try {
      const { user_email, password } = req.body;
      const userInfo = {
        email: user_email,
        password: password,
      };
      const user = await userModal.LogInUser(userInfo);
      const token = jwt.sign({ email: user_email }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      res.cookie("tomato_token_server", token, {
        httpOnly: true,
      });

      // Setting a non-HttpOnly cookie for client-side use
      // res.cookie("tomato_token", token, {
      //   httpOnly: false,
      // });
      res.status(200).json({
        status: 1,
        message: "User logged in  successfully",
        token: token,
        user: user,
      });
    } catch (error) {
      next(errorHandler(400, error.message));
    }
  },
};
