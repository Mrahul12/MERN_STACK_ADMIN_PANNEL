const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const databaseCollection = process.env.CREATE_REGISTRATION;

const registrationSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});


// ? Password hash before save record in mongoDB
registrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

// ? Compare password
registrationSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const registartionSchemaModel = mongoose.model(
  databaseCollection,
  registrationSchema
);
module.exports = registartionSchemaModel;
