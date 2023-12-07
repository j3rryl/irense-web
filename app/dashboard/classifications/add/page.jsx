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
import useSWR from "swr";
import { Avatar } from "@nextui-org/avatar";
import { useSession } from "next-auth/react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  
  const { data, isLoading } = useSWR(
    `/api/patients`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const filteredItems = React.useMemo(() => {
    let filteredRows = [...(data?.rows || [])];
    return filteredRows;
  }, [data?.rows]);
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const classification = Object.fromEntries(formData.entries());
    classification.physicianId = session?.user?.id
    classification.patientId = Number(classification.patientId)
    try {
    setLoading(true)
      const response = await fetch(
        `/api/classifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classification),
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
            <Select
                items={filteredItems}
                label="Patient"
                name="patientId"
                placeholder="Select patient"
                isRequired
                variant="bordered"
                disallowEmptySelection
                isLoading={isLoading}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span key={item.key}>{item.data.firstName+ " "+ item.data.lastName}</span>
                      ))}
                    </div>
                  );
                }}
              >
                {(patient) => (
                  <SelectItem key={patient.id} textValue={patient.firstName}>
                    <div className="flex gap-2 items-center">
                      <Avatar alt={patient.firstName} className="flex-shrink-0" size="sm" src={patient.avatar} />
                      <div className="flex flex-col">
                        <span className="text-small">{patient.firstName}</span>
                        <span className="text-tiny text-default-400">{patient.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Select
                label="Eye Side"
                placeholder="Select side of eye"
                defaultSelectedKeys={["right"]}
                disallowEmptySelection
                isRequired
                name="eyeSide"
                variant="bordered"
                // className="max-w-xs"
                // scrollShadowProps={{
                //   isEnabled: false
                // }}
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
