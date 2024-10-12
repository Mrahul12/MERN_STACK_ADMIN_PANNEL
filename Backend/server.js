const express = require("express");
require("dotenv").config();
const cors = require("cors");
const crossOrigin = require("./CorsController/frontendBackendController.js");
require("./Config/dbConfigure.js");
const authRouter = require("./Routers/authRouter.js");
const app = express();
const portNumber = process.env.PORT || 4000;

// * Built-in Middleware
app.use(cors(crossOrigin)); //? for connect server with frontend
app.use(express.json()); //? for form data in json or when use poast method
app.use(express.urlencoded({ extended: true })); //? For parsing application/x-www-form-urlencoded
app.use('/getemployeeimage',express.static('uploads')) //? uploads folder image on server


// *Router Connection
app.use("/", authRouter);

// * Server run on port =========
app.listen(portNumber, () => {
  console.log(`Server Running On Port Number ${portNumber}`);
});
