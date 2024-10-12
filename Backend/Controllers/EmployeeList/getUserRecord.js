const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");

const getEmployeeRecord = async (req, resp) => {
  try {
    const getEmployeeData=await employeeSchemaAndModel.find({})
    resp
      .status(200)
      .send( getEmployeeData );
  } catch (err) {
    resp.status(500).json({ message: "Oops.. server error throw...." });
  }
};
module.exports = getEmployeeRecord;
