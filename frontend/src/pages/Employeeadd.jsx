import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import validation from "../validation/validationSchema";
import { toast } from "react-toastify";
import{useNavigate} from "react-router-dom";
const initialValues = {
  name: "",
  email: "",
  mobile: "",
  designation: "",
  gender: "",
  courses: [],
  image: null,
};

const Employeeadd = () => {

  const navigate=useNavigate()

  const Formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: async (values, action) => {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/employeeadd",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${
              JSON.parse(localStorage.getItem("userToken")).authorizer
            }`,
          },
          data: values,
        });
            if (response.status) {
              navigate('/')
              toast.success(`${response.data.message}`);
            }
      } catch (err) {
        toast.error("Error from Employeeadd Component Api");
      }
      setFieldValue('')
      action.resetForm();
    },
  });

  const {
    values,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = Formik;

  return (
    <>
      <section className="w-full h-screen flex justify-center p-10 ">
        <form
          className="flex flex-col   border h-[800px] max-md:w-[100%] md:w-[500px] p-3 rounded-md justify-around bg-white shadow-[0px_0px_5px_1px_black] "
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-violet-700">
            Create Employee Details
          </h2>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="ename" className="text-1xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="ename"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2 "
              placeholder="Enter Name..."
              autoFocus
              required
            />
            {touched.name && errors.name ? (
              <div className="text-1xl text-red-500">{errors.name}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-1xl font-semibold ">
              Email Id
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2"
              placeholder="Enter Email..."
              required
            />
            {touched.email && errors.email ? (
              <div className="text-1xl text-red-500">{errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phone" className="text-1xl font-semibold ">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              id="phone"
              minLength={10}
              maxLength={10}
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2"
              placeholder="Enter Mobile number..."
              required
            />
            {touched.mobile && errors.mobile ? (
              <div className="text-1xl text-red-500">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="designation" className="text-1xl font-semibold ">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="p-2 bg-white border-2 rounded-md hover:border-violet-500"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.designation}
            >
              <option value="">Select...</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {touched.designation && errors.designation ? (
              <div className="text-1xl text-red-500">{errors.designation}</div>
            ) : null}
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
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="male" className="text-1xl font-semibold ">
                M
              </label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value="F"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="female" className="text-1xl font-semibold ">
                F
              </label>
            </section>
            {touched.gender && errors.gender ? (
              <div className="text-1xl text-red-500">{errors.gender}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-1xl font-semibold">Courses :</p>
            {["MCA", "BCA", "BSC"].map((course) => (
              <label key={course}>
                <input
                  type="checkbox"
                  value={course}
                  onChange={(e) => {
                    const { checked } = e.target;
                    const courses = checked
                      ? [...values.courses, course]
                      : values.courses.filter((c) => c !== course);
                    setFieldValue("courses", courses);
                  }}
                />
                {course}
              </label>
            ))}
            {touched.course && errors.course ? (
              <div className="text-1xl text-red-500">{errors.course}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="image" className="text-1xl font-semibold ">
              Img Upload
            </label>
            <input
              type="file"
              name="image"
              id="image"
              // value={values.image}
              onChange={(event) => {
                setFieldValue("image", event.target.files[0]);
              }}
              className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2"
              required
            />
            {touched.image && errors.image ? (
              <div className="text-1xl text-red-500">{errors.image}</div>
            ) : null}
          </div>

          <button
            className="text-violet-500 font-bold text-xl p-2 shadow-[0px_0px_2px_1px] rounded-md hover:text-slate-700"
            type="submit"
          >
            Create Employee
          </button>
        </form>
      </section>
    </>
  );
};
export default Employeeadd;
