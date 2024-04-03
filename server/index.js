const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const getUserRouter = require("./routes/user.routes.js");
const cartRouter = require("./routes/cart.routes.js");
// const userLoginRoutes = require("./routes/user.routes.js");

dotenv.config();
const post = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", getUserRouter);
app.use("/api/cart", cartRouter);

app.get("/api/test", (req, res) => {
  res.send("Hello World");
});

app.listen(post, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log(`Server has been started at ${post}`);
  }
});
// customize middleware to send the error response to every controller using next()
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
