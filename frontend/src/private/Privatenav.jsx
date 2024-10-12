import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const Privatenav = () => {
  const userAuths = localStorage.getItem("userAuthor");
  return userAuths ? <Outlet /> : <Navigate to="/login" />;
};

export default Privatenav;
