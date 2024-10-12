const registartionSchemaModel = require("./../../Modules/UserCredientialSchema/registerationSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_TOKEN_KEY;
// Registration for User;

const registerUser = async (req, resp) => {
  const { username, password } = req.body;

  try {
    const validUsername = await registartionSchemaModel.findOne({ username });
    if (validUsername) {
      return resp.status(400).json({ message: "Username already existing." });
    }

    // ? Create User Crediential Record

    const userRecord = new registartionSchemaModel({
      username,
      password,
    });
    const result = await userRecord.save();

    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp
          .status(400)
          .json({ message: "Something went wrong from JWT token." });
      }
      resp.status(201).json({
        message: "Registration successfully....",
        result,
        authorizer: token,
      });
    });
  } catch (err) {
    resp.status(500).json({ message: "Oops server error throw...." });
  }
};

// ? LoginUser====================

const loginUser = async (req, resp) => {
  const { username, password } = req.body;
  try {
    const existUser = await registartionSchemaModel.findOne({ username });
    const passwordMatch = await existUser.comparePassword(password);
    if (!passwordMatch) {
      return resp.status(401).json({ message: "Invalid credentials" });
    } else {
     
    jwt.sign({ existUser }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp
          .status(400)
          .json({ message: "Something went wrong from JWT token." });
      }
      resp.status(200).json({
        message: "Login successfully.......",
        existUser,
        authorizer: token,
      });
    });
    
    }
  } catch (err) {
    resp.status(500).json({ message: "Oops server error throw...." });
  }
};

module.exports = { registerUser, loginUser };
