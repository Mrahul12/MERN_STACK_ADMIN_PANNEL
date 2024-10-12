import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navlink = () => {
  const userAuth = localStorage.getItem("userAuthor");
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-green-200 p-3 shadow-[0px_0px_5px_1px_grey] flex justify-around items-center h-20">
        <div className="text-xl font-bold font-sans text-pretty">Logo.</div>
        <ul className="flex items-center gap-7">
          {userAuth == null ? (
            <>
              <Link
                to="/register"
                className="text-xl font-sans font-semibold text-slate-700 hover:text-green-600"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="text-xl font-sans font-semibold text-slate-700 hover:text-cyan-600"
              >
                SignIn
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-xl font-sans font-semibold text-slate-800 hover:text-teal-500"
              >
                Home
              </Link>
              <Link
                to="/employeeadd"
                className="text-xl font-sans font-semibold text-slate-800 hover:text-teal-500"
              >
                Employee
              </Link>
              {/* <Link to="/employeeupdate/:id" className="text-xl font-sans font-semibold text-slate-800 hover:text-teal-500"></Link> */}
              <Link
                to="/employeelist"
                className="text-xl font-sans font-semibold text-slate-800 hover:text-teal-500"
              >
                Employee_List
              </Link>
              <button
                className="text-xl text-red-600 font-semibold flex"
                onClick={handleSignOut}
              >
                <p className='text-slate-900 font-sans text-1xl'>{JSON.parse(userAuth).username}</p> - SignOut
              </button>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
export default Navlink;
