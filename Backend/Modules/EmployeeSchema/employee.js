const mongoose = require("mongoose");
const employeeCollection = process.env.EMPLOYEE_LIST;
const EmployeeSchema = new mongoose.Schema({
  userId:{type:Number},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: [{ type: String, require: true }],
  image: { type: String, required: true },
  date:{type:String}
});

const employeeSchemaAndModel = mongoose.model(
  employeeCollection,
  EmployeeSchema
);
module.exports = employeeSchemaAndModel;
