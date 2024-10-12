const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");

const deleteEmployeeRecord = async (req, resp) => {

  try {
   const deleteRecord=await employeeSchemaAndModel.deleteOne({_id:req.params.id})
    resp
      .status(201)
      .json({ message: "Parmanently delete record.", deleteRecord });
  } catch (err) {
    resp.status(500).json({ message: "Oops.. server error throw...." });
  }
};
module.exports = deleteEmployeeRecord;
