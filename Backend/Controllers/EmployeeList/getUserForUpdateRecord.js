const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");

const getEmployeeForUpdateRecord = async (req, resp) => {
  try {
    const getUpdateEmployeeData = await employeeSchemaAndModel.findOne({
      _id: req.params.id,
    });
    resp.status(200).send(getUpdateEmployeeData);
  } catch (err) {
    resp.status(500).json({ message: "Oops.. server error throw...." });
  }
};
module.exports = getEmployeeForUpdateRecord;
