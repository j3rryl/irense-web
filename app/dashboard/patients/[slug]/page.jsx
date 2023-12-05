import React from "react";
import PatientDetails from "./PatientDetails";
import DRClassificationTable from "./DRClassificationTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = ({params}) => {
  return (
    <>
    <PatientDetails patient={params?.slug}/>
    <DRClassificationTable patient={params?.slug}/>
    <ToastContainer/>
    </>
  );
};

export default Page;
