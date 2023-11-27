import React from "react";
import PatientDetails from "./PatientDetails";
import DRClassificationTable from "./DRClassificationTable";
const Page = () => {
  return (
    <>
    <PatientDetails/>
    <DRClassificationTable patient={1}/>
    </>
  );
};

export default Page;
