"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";

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
          method: "PUT",
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
            Update Test
          </h6>
          <form onSubmit={onSubmit}>
            <div className="grid md:grid-cols-1 md:gap-6 mb-3">
            <Select
                label="Eye Side"
                placeholder="Select side of eye"
                defaultSelectedKeys={["right"]}
                disallowEmptySelection
                isRequired
                name="eyeSide"
                variant="bordered"
              >
                  <SelectItem key="right" value="right">
                    Right
                  </SelectItem>
                  <SelectItem key="left" value="left">
                    Left
                  </SelectItem>
                </Select>
              <Textarea
                autoFocus
                label="Description"
                type="text"
                name="description"
                isRequired
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
