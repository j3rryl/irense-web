import React from "react";
import PhysicianDetails from "./PhysicianDetails";
const Page = ({params}) => {
  return (
    <>
    <PhysicianDetails physician={params?.slug}/>
    </>
  );
};

export default Page;
