import React, { lazy,Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navlink from "./Navlink";
import Privatenav from "../private/Privatenav";
const Home = lazy(() => import("./Home"));
const Register = lazy(() => import("./Register"));
const Login = lazy(() => import("./Login"));
const NotFound = lazy(() => import("./NotFound"));
const Employeeadd=lazy(()=>import("./../pages/Employeeadd"))
const Employeeupdate=lazy(()=>import("./../pages/Employeeupdate"))
const Employeelist=lazy(()=>import("./../pages/Employeelist"))
const Navbar = () => {
  return (
    <>

        <BrowserRouter>
          <Navlink />
          <Routes>
            <Route
              path="/register"
              element={
                <Suspense fallback={<h2>Loading.....</h2>}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<h2>Loading.....</h2>}>
                  <Login />
                </Suspense>
              }
            />

            {/* ?==================Private Router======================= */}
            <Route element={<Privatenav />}>
              <Route
                path="/"
                element={
                  <Suspense fallback={<h2>Loading.....</h2>}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/employeeadd"
                element={
                  <Suspense fallback={<h2>Loading.....</h2>}>
                    <Employeeadd />
                  </Suspense>
                }
              />
              <Route
                path="/employeeupdate/:id"
                element={
                  <Suspense fallback={<h2>Loading.....</h2>}>
                    <Employeeupdate/>
                  </Suspense>
                }
              />
              <Route
                path="/employeelist"
                element={
                  <Suspense fallback={<h2>Loading.....</h2>}>
                    <Employeelist/>
                  </Suspense>
                }
              />
    
            </Route>
            {/* ?========================================= */}
            <Route
              path="*"
              element={
                <Suspense fallback={<h2>Loading.....</h2>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
    </>
  );
};

export default Navbar;
