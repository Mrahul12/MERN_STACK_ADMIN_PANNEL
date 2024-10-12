const employeeSchemaAndModel = require("./../../Modules/EmployeeSchema/employee");

const searchApi = async (req, resp) => {
  try {
    const searchApis = await employeeSchemaAndModel.find({
      $or: [
     
        {
          name: { $regex: new RegExp(req.params.key, "i") }, //case-insensetive
        },
        {
          email: { $regex: new RegExp(req.params.key, "i") },
        },
        {
          mobile: { $regex: new RegExp(req.params.key, "i") },
        },
        {
          designation: { $regex: new RegExp(req.params.key, "i") },
        },
        {
          gender: { $regex: new RegExp(req.params.key, "i") },
        },
        {
          courses: { $regex: new RegExp(req.params.key, "i") },
        },
        {
          date: { $regex: new RegExp(req.params.key, "i") },
        },
      ],
    });

    resp.status(200).send(searchApis);
  } catch (e) {
    resp.status(500).json({ message: "Internal server error from searchApi" });
  }
};

module.exports = searchApi;
