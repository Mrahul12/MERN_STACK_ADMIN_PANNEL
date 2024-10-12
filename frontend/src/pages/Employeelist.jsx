import React, { useEffect, useState } from "react";
import axios from"axios";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api/getemployeerecord";
const urlImage = "http://localhost:5000/getemployeeimage";
const Employeelist = () => {
  const [employee, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sortBy, setSortBy] = useState("Sorting By Name, Email,Id, Date......");

  useEffect(() => {
    getEmployeeRecord(API);
  }, []);

  const getEmployeeRecord = async (employeeUrl) => {
    const response = await fetch(employeeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("userToken")).authorizer
        }`,
      },
    });

    const result = await response.json();
    if (result.length >= 0) {
      setEmployee(result);
    }
  };

  // *======= Delete Action================================================================================

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteemployee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${
              JSON.parse(localStorage.getItem("userToken")).authorizer
            }`,
          },
        }
      );
      if (response.ok) {
        toast.success("Record Deleted Successfully");
        getEmployeeRecord(API);
      } else {
        toast.error(
          `${response.status} ${response.statusText} for Delete Record.`
        );
      }
    } catch (e) {
      toast.error("Error from AllAddList when Delelte record.");
    }
  };

  // * Search API with debouncing==================================================================

  const handleChange = async (e) => {
    let keyvalue = e.target.value;

    try {
      if (keyvalue) {
        const response = await fetch(
          `http://localhost:5000/api/searchapi/${keyvalue}`,
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
        const result = await response.json();
        if (result) {
          setEmployee(result);
        }
      } else {
        getEmployeeRecord(API);
      }
    } catch (e) {
      console.log("Search api error");
    }
  };


  // * Sort Records=================================================================================


  const handleSorting=(val)=>{
    setSortBy(val)
    const sortrec=[...employee].sort((a,b)=>{
      if(a[val]<b[val]) return -1;
      if(a[val]>b[val]) return 1;
      return 0;
    })
    setEmployee(sortrec)
  }


  return (
    <>
      <section className="flex flex-col items-center flex-grow">
        <div className="flex justify-center p-2 relative w-[500px]">
          <input
            type="text"
            placeholder="Search by name,email,date,designation,gender"
            className="border-2 w-[500px] p-[10px_5px_10px_40px] rounded-full border-slate-700 text-slate-800 font-semibold  outline-none"
            onChange={handleChange}
          />
          <IoSearch className="absolute left-5 top-[18px] text-2xl font-bold text-slate-600" />
        </div>
        <select
          onChange={(e) => handleSorting(e.target.value)}
          value={sortBy}
          className="p-2 bg-white border-2 border-slate-500 rounded-2xl"
        >
          <option value="Sorting By Name, Email,Id, Date......" disabled>
            Sorting By Name, Email,Id, Date......
          </option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="userId">UserId</option>
          <option value="date">Date</option>
        </select>
        <section className="overflow-y-scroll overflow-x-hidden p-[12px_15px] w-full rounded-lg">
          <p className="text-xl bg-yellow-600 p-2 rounded-sm w-[200px]">
            Total count: {employee.length}
          </p>
          <table className="w-full">
            <thead className="">
              <tr className="w-full">
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Employee Id
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Image
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Name
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Email{" "}
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Mobile No
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Designation
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Gender
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Course
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Create Date
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Update
                </th>
                <th className="p-2 text-center border-2  border-slate-800 text-slate-900 ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="">
              {employee.length >= 0
                ? employee.map((val, ind) => {
                    const {
                      userId,
                      _id,
                      image,
                      name,
                      email,
                      mobile,
                      designation,
                      gender,
                      courses,
                      date,
                    } = val;
                    return (
                      <tr className="" key={ind}>
                        <td className="p-2 text-center border-2 border-slate-500 text-slate-900 font-semibold">
                          {userId}
                        </td>
                        <td className="p-2 text-center border-2 border-slate-500 text-slate-900 font-semibold ">
                          <img
                            src={`${urlImage}/${image}`}
                            alt="food image"
                            loading="lazy"
                            className="w-full h-[40px] object-center rounded-sm"
                          />
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          {name}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          {email}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold  ">
                          {mobile}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          {designation}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          {gender}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold ">
                          {courses.map((val, ind) => {
                            return (
                              <p key={ind} className="text-nowrap">
                                {val}
                              </p>
                            );
                          })}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          {date}
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          <div className="flex justify-center">
                            <Link to={`/employeeupdate/${_id}`}>
                              <FaEdit className="bg-white text-green-600 p-2 shadow-[0px_0px_5px_1px] text-center rounded-md text-3xl" />
                            </Link>
                          </div>
                        </td>
                        <td className="p-2 text-center border-2  border-slate-500 text-slate-900 font-semibold">
                          <button
                            className="bg-white text-red-600 p-2 shadow-[0px_0px_5px_1px] text-center rounded-md text-1xl"
                            onClick={() => handleDelete(_id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : "Data Not Available"}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};
export default Employeelist;
