import React from "react";
import Notfound from "./../assets/notFound.jpg";
const NotFound = () => {
  return (
    <>
      <section className=" w-screen">
        <img src={Notfound} alt="banner" className="rounded  h-[90vh] w-full " />
      </section>
    </>
  );
};

export default NotFound;
