const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.tomato_token ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxY2M1OGMxMS02MGNhLTQyNTAtYWIyMS1kMzdlNjhjNGVmMzciLCJlbWFpbCI6InVzZXIxNEBnbWFpbC5jb20iLCJpYXQiOjE3MTIxNDcxMzAsImV4cCI6MTcxMjE1MDczMH0.t42SJdQeLhdJQ-4FGbY0j4s-Wu5A9kXpIOWSpxfeJp4";
  console.log("token", token);

  // const decoded = jwt.verify(
  //   token,
  //   process.env.JWT_SECRET_KEY || "",
  //   (err, decoded) => {

  // );

  if (!token) {
    return next(errorHandler(401, "Unauthriozed User"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ statusCode: 401, message: "Token Expired" });
      console.log("Unauthorized! Access Token was expired!");
      return next(errorHandler(401, "Unauthorized! Access Token was expired!"));
    }
    if (err instanceof jwt.NotBeforeError) {
      console.log("Unauthorized! Access Token was expired!");
      return next(errorHandler(401, "jwt not active"));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      console.log("Unauthorized! Access Token was expired!");
      return next(errorHandler(401, "jwt malformed"));
    }

    if (err) {
      console.log("Unauthorized! Access Token was expired!");
      return next(errorHandler(401, "Unauthriozed User"));
    }

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
