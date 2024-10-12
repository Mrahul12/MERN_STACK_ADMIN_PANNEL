const express = require("express");
const verifyToken=require('./../middleware/jwtMiddleware')


// ? Route-Level Middleware

const router = express.Router();

const multerImage=require('./../middleware/fulterImage')

// todo =============================================================
// * Registartion and Login
const {
  registerUser,
  loginUser,
} = require("./../Controllers/UserCrediential/userRegistration");

// todo================================================================
// * Employee Api
const postEmployeeRecord=require('./../Controllers/EmployeeList/postUserRecord')
const getEmployeeRecord=require('./../Controllers/EmployeeList/getUserRecord')
const getEmployeeForUpdateRecord=require('./../Controllers/EmployeeList/getUserForUpdateRecord')
const putEmployeeRecord=require('./../Controllers/EmployeeList/putUserRecord')
const deleteEmployeeRecord=require('./../Controllers/EmployeeList/deleteUserRecord')
const searchApi=require('./../Controllers/EmployeeList/searchapi')

// todo ================================================================
// * User_Register_And_Login_Router

router.post('/api/register',registerUser)
router.post("/api/login", loginUser);

// todo===================================================================
// * Operation Perform On Employee_List Like POST,GET,PUT,DELETE

router.post("/api/employeeadd",multerImage, postEmployeeRecord);
router.get("/api/getemployeerecord",getEmployeeRecord);
router.get("/api/getupdateemployeerecord/:id", getEmployeeForUpdateRecord);
router.put("/api/putupdateemployeerecord/:id", multerImage, putEmployeeRecord);
router.delete('/api/deleteemployee/:id',deleteEmployeeRecord)
router.get("/api/searchapi/:key",  searchApi);


module.exports=router;