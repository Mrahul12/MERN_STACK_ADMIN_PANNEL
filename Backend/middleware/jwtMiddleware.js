const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const jwtKey = process.env.JWT_TOKEN_KEY;

const verifytoken = (req, resp, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).json({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).json({ message: "Please add token with headers" });
  }
};
module.exports = verifytoken;
