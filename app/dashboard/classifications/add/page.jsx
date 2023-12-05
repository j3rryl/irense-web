"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody } from "@nextui-org/card";

const Page = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const patient = Object.fromEntries(formData.entries());

    try {
    setLoading(true)
      const response = await fetch(
        `/api/classifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        }
      );
      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData?.message);
        setTimeout(() => {
          router.refresh();
          router.back();
        }, 1000);
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unknown Error, please contact System Administrator.");
    } finally{
        setLoading(false)
    }
  };
  return (
    <>
      <Card className="mx-5">
        <CardBody>
          <h6 className=" font-bold my-5">
            Add New Test
          </h6>
          <form onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6 mb-3">
              <Input
                autoFocus
                label="Patient"
                type="text"
                name="firstName"
                isRequired
                placeholder="Eric"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Eye Side"
                type="text"
                name="firstName"
                isRequired
                placeholder="Eric"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Description"
                type="text"
                name="lastName"
                isRequired
                placeholder="Kaigua"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Images"
                type="email"
                name="email"
                isRequired
                placeholder="kaigua@gmail.com"
                variant="bordered"
              />
            </div>
            <div className="flex justify-end gap-6 items-center mt-3">
              <Button color="primary" type="submit" isLoading={loading}>
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};

export default Page;