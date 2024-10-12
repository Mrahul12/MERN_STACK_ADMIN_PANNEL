const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");


const dates=new Date();


const postEmployeeRecord = async (req, resp) => {
 
  const { name,email,mobile,designation,gender,courses } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // * Check email exist or not
    const existEmail = await employeeSchemaAndModel.findOne({ email });
    if (existEmail) {
      return resp.status(400).json({ message: "Email Id already existing." });
    }

    const employeeRecord = new employeeSchemaAndModel({
      userId: Math.floor(Math.random() * 1001),
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image,
      date:dates.toDateString().slice(3),
    });
    const result = await employeeRecord.save();
    resp
      .status(201)
      .json({ message: "Create employee record successfully.", result });
  } catch (err) {
    resp.status(500).json({ message: "Oops.. server error throw...." });
  }
};
module.exports = postEmployeeRecord;
