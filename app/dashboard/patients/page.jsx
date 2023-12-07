import React from "react";
import PatientsTable from "./PatientsTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Page = () => {
  return (
    <>
    <PatientsTable/>
    <ToastContainer/>
    </>
  );
};

export default Page;
