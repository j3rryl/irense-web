import React from "react";
import DRClassificationTable from "./DRClassificationTable";
import PhysicianDetails from "./PhysicianDetails";
const Page = () => {
  return (
    <>
    <PhysicianDetails/>
    <DRClassificationTable physician={1}/>
    </>
  );
};

export default Page;
