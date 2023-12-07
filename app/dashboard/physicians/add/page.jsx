"use client";
import { Input } from "@nextui-org/input";
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
    const physician = Object.fromEntries(formData.entries());
    if(physician.password!==physician.cpassword){
      toast.error("Passwords do not match!");
      return;
    }
    try {
    setLoading(true)
      const response = await fetch(
        `/api/physicians`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(physician),
        }
      );
      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData?.message);
        setTimeout(() => {
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
            Add New Physician
          </h6>
          <form onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6 mb-3">
              <Input
                autoFocus
                label="First Name"
                type="text"
                name="firstName"
                isRequired
                placeholder="Eric"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Last Name"
                type="text"
                name="lastName"
                isRequired
                placeholder="Kaigua"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Email"
                type="email"
                name="email"
                isRequired
                placeholder="kaigua@gmail.com"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Phone Number"
                type="tel"
                name="phone"
                isRequired
                placeholder="0712345678"
                variant="bordered"
              />
              <Input
                autoFocus
                label="Password"
                type="password"
                name="password"
                isRequired
                variant="bordered"
              />
              <Input
                autoFocus
                label="Confirm Password"
                type="password"
                name="cpassword"
                isRequired
                variant="bordered"
              />
              <Select
                label="Gender"
                name="gender"
                placeholder="Select gender"
                defaultSelectedKeys={["Male"]}
                disallowEmptySelection
                isRequired
                variant="bordered"
              >
                  <SelectItem key="Male" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem key="Female" value="Female">
                    Female
                  </SelectItem>
                </Select>
              <Select
                label="Role"
                name="role"
                placeholder="Select role"
                defaultSelectedKeys={["USER"]}
                disallowEmptySelection
                isRequired
                variant="bordered"
              >
                  <SelectItem key="USER" value="USER">
                    User
                  </SelectItem>
                  <SelectItem key="ADMIN" value="ADMIN">
                    Administrator
                  </SelectItem>
                </Select>
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
