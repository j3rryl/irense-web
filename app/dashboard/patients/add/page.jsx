"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const pond = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    //Filepond
    const fileItems = pond.current.getFiles();
    const file = fileItems[0].file;
    formData.set("image", file);


    try {
    setLoading(true)
      const response = await fetch(
        `/api/patients`,
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
            Add New Patient
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
                // variant="bordered"
              />
              <Input
                autoFocus
                label="Last Name"
                type="text"
                name="lastName"
                isRequired
                placeholder="Kaigua"
                // variant="bordered"
              />
              <Input
                autoFocus
                label="Email"
                type="email"
                name="email"
                isRequired
                placeholder="kaigua@gmail.com"
                // variant="bordered"
              />
              <Input
                autoFocus
                label="Phone Number"
                type="tel"
                name="phone"
                isRequired
                placeholder="0712345678"
                // variant="bordered"
              />
               <Select
                label="Gender"
                name="gender"
                placeholder="Select gender"
                defaultSelectedKeys={["Male"]}
                disallowEmptySelection
                isRequired
                // variant="bordered"
              >
                  <SelectItem key="Male" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem key="Female" value="Female">
                    Female
                  </SelectItem>
                </Select>
            </div>
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
