"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useRef, useState } from "react";
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

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const Page = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const pond = useRef(null);

  
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
    formData.set('physicianId', session?.user?.id)
    formData.set('patientId', Number(formData.get('patientId')))

    //Filepond
    const fileItems = pond.current.getFiles();
    const file = fileItems[0].file;
    formData.set("image", file);

    try {
    setLoading(true)
      const response = await fetch(
        `/api/classifications`,
        {
          method: "POST",
          body: formData,
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
                // variant="bordered"
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
                      <Avatar alt={patient.firstName} className="flex-shrink-0" size="sm" src={patient.image} />
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
                // variant="bordered"
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
            </div>
            <Textarea
            className="mb-3"
                autoFocus
                label="Description"
                type="text"
                name="description"
                isRequired
                // variant="bordered"
              />
              <FilePond
                ref={pond}
                allowReorder={true}
                maxFiles={1}
                required
                server="/api/uploads"
                name="file"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
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
