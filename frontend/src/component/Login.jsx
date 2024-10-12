import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
const initialValues = {
  username: "",
  password: "",
};
const Login = () => {
  const navigate=useNavigate()
   const Formik = useFormik({
     // initialValues:initialValues,
     initialValues,
     onSubmit: async (values, action) => {
       try {
         const response = await axios({
           url: "http://localhost:5000/api/login",
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           data: values,
         });


         const { authorizer, existUser } = response.data;
         const { username } = existUser;
         if (response.status) {
           toast.success("Login Successfully.");
           navigate("/");
           localStorage.setItem("userAuthor", JSON.stringify({ username }));
           localStorage.setItem("userToken", JSON.stringify({ authorizer }));
         }
       } catch (e) {
        
         toast.error("Invalid Credientials.");
       }
       action.resetForm();
     },
   });
   const { values, handleSubmit, handleBlur, handleChange } = Formik;

 return (
   <>
     <section className="w-full h-screen flex justify-center p-20">
       <form
         className="flex flex-col  max-md:w-[100%] md:w-[500px] border h-[400px] w-[300px] p-3 rounded-md justify-around bg-white shadow-[0px_0px_5px_1px_black]"
         onSubmit={handleSubmit}
       >
         <h2 className="text-xl font-bold text-violet-500">
           Sign in For Admin
         </h2>
         <div className="flex flex-col gap-2 w-full">
           <label htmlFor="username" className="text-1xl font-semibold">
             Username
           </label>
           <input
             type="text"
             name="username"
             id="username"
             value={values.username}
             onChange={handleChange}
             onBlur={handleBlur}
             className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2"
             placeholder="Enter Username..."
             autoFocus
             required
           />
         </div>
         <div className="flex flex-col gap-2 w-full">
           <label htmlFor="password" className="text-1xl font-semibold">
             Password
           </label>
           <input
             type="password"
             name="password"
             id="password"
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
             className=" p-2 text-xl rounded-sm outline-none hover:border-violet-500 border-2"
             placeholder="Enter Password..."
             minLength={8}
             maxLength={10}
             required
           />
         </div>
         <button className="text-blue-700 font-bold text-xl p-2 shadow-[0px_0px_2px_1px] rounded-md hover:text-slate-500 "
         type="submit">
           SignIn
         </button>
         <p className="flex gap-2 justify-center items-center font-semibold text-slate-800 text-nowrap">
           Don't have an account?
           <Link to="/register" className="text-blue-700 font-bold underline">
             Create Account
           </Link>
         </p>
       </form>
     </section>
   </>
 );
};
export default Login;
