const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");

const putEmployeeRecord = async (req, resp) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file ? req.file.filename : null;

    const updates = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image,
    };
    const updatedUser = await employeeSchemaAndModel.updateOne(
      { _id: req.params.id },
      {
        $set: updates,
      }
    );
    resp.status(200).json({ message: "Update Successfuly....", updatedUser });
  } catch (err) {
    resp.status(500).json({ message: "Oops.. server error throw...." });
  }
};
module.exports = putEmployeeRecord;
