import React from "react";
import DRClassificationTable from "./DRClassificationTable";
import PhysicianDetails from "./PhysicianDetails";
const Page = ({params}) => {
  return (
    <>
    <PhysicianDetails physician={params?.slug}/>
    {/* <DRClassificationTable physician={params?.slug}/> */}
    </>
  );
};

export default Page;
