import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import validationSchemas from "./../validation/updateValidate";

const initialValues = {
  name: "",
  email: "",
  mobile: "",
  designation: "",
  gender: "",
  courses: [],
  image: null,
};

const Employeeupdate = () => {
  // ? useParams hook used to get parameter value
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState("");

  const [errors, setErrors] = useState({});

  const updatess = { name, email, mobile, designation, gender, courses, image };

  // ?===============================================

  const getEmployeeDetailsWithParamsId = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getupdateemployeerecord/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${
              JSON.parse(localStorage.getItem("userToken")).authorizer
            }`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const { name, email, mobile, designation, gender, courses, image } =
          result;
        setName(name);
        setEmail(email);
        setMobile(mobile);
        setDesignation(designation);
        setGender(gender);
        setCourses(courses);
        setImage(image);
      
      }
    } catch (e) {
      toast.error("Api call error from Employeeupdate Component");
    }
  };
  useEffect(() => {
    getEmployeeDetailsWithParamsId();
  }, []);

  // *============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: `http://localhost:5000/api/putupdateemployeerecord/${params.id}`,
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
        data: updatess,
      });

      if (response.status) {
        toast.success("Update Successfully.......");
        navigate("/employeelist");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };



  return (
    <>
      <section className="w-full h-screen flex justify-center p-10 ">
        <form
          className="flex flex-col   border h-[800px] max-md:w-[100%] md:w-[500px] p-3 rounded-md justify-around bg-white shadow-[0px_0px_5px_1px_black] "
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-sky-600">
            Update Employee Details
          </h2>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="ename" className="text-1xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="ename"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" p-2 text-xl rounded-sm outline-none hover:border-sky-500 border-2 "
              placeholder="Enter Name..."
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-1xl font-semibold ">
              Email Id
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-2 text-xl rounded-sm outline-none hover:border-sky-500 border-2"
              placeholder="Enter Email..."
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phone" className="text-1xl font-semibold ">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              id="phone"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className=" p-2 text-xl rounded-sm outline-none hover:border-sky-500 border-2"
              placeholder="Enter Email..."
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="designation" className="text-1xl font-semibold ">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="p-2 bg-white border-2 rounded-md hover:border-sky-500"
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
            >
              <option value="">Select...</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="gender" className="text-1xl font-semibold ">
              Gender
            </label>
            <section className="flex gap-2">
              <input
                type="radio"
                name="gender"
                id="gender"
                value="M"
                checked={gender === "M"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label htmlFor="male" className="text-1xl font-semibold ">
                M
              </label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value={gender}
                checked={gender === "F"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label htmlFor="female" className="text-1xl font-semibold ">
                F
              </label>
            </section>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-1xl font-semibold">Courses :</p>
            {["MCA", "BCA", "BSC"].map((course) => (
              <label key={course}>
                <input
                  type="checkbox"
                  value={course}
                  checked={courses.includes(course)}
                  name="courses"
                  onChange={(e) => setCourses(e.target.value)}
                />
                {course}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2 w-full justify-center">
      
            <label htmlFor="image" className="text-1xl font-semibold ">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpg"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className=" p-2 text-xl rounded-sm outline-none hover:border-sky-500 border-2"
              required
            />
          </div>

          <button
            className="text-sky-500 font-bold text-xl p-2 shadow-[0px_0px_2px_1px] rounded-md hover:text-slate-700"
            type="submit"
          >
            Update
          </button>
        </form>
      </section>
    </>
  );
};
export default Employeeupdate;
