const mongoose = require("mongoose");
require("dotenv").config();

const databaseName = process.env.DATABASE_URL;

mongoose
  .connect(databaseName)
  .then((res, rej) => {
    console.log("Database connection Successfully.....");
  })
  .catch((e) => {
    console.log("Database connection Failed....");
  });
