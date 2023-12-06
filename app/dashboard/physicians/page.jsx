import React from "react";
import PhysiciansTable from "./PhysiciansTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  return (
    <>
    <PhysiciansTable/>
    <ToastContainer/>
    </>
  );
};

export default Page;
