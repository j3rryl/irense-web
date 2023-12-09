"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import useSWR, { mutate } from "swr";
import NextUITable from "@/app/components/tables/NextUITable";
import { columns, drClassificationRender } from "./drClassificationColumns";
import { Button } from "@nextui-org/button";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DRClassificationTable = ({patient}) => {
  const router = useRouter()
  const {data:session} = useSession()
  const [page, setPage] = React.useState(1);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");

  const { data, isLoading } = useSWR(
    `/api/classifications?patientId=${patient}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = React.useMemo(() => {
    let filteredRows = [...(data?.rows || [])];

    return filteredRows;
  }, [data?.rows]);

  const pages = React.useMemo(() => {
    return data?.count ? Math.ceil(data.count / 10) : 0;
  }, [data?.count]);

  const rowCount = React.useMemo(() => {
    return data?.count ? data?.count : 0;
  }, [data?.count]);

  const onSubmit = async(event)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const classification = Object.fromEntries(formData.entries());
    classification.physicianId = session?.user?.id;
    classification.patientId = Number(patient);

    try {
      const result = await fetch(`/api/classifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classification),
      });
      const message = await result.json();
      if (result.ok) {
        toast.success(message?.message);
          router.refresh()
          mutate(`/api/classifications?patientId=${patient}`)
      } else {
        toast.error(message?.error);
      }
    } catch (error) {
      toast.error("Unknown error! Please contact System Administrator.");
    } 

  }
  return (
    <>
    <Card className="mx-5">
      <div className="flex justify-end items-center mt-4 me-4">
        <Button color="primary" onPress={onOpen}>
          New Test
        </Button>
      </div>
      <CardBody>
        <NextUITable
          columns={columns}
          renderCell={drClassificationRender}
          isLoading={isLoading}
          // page={page}
          // pages={pages}
          // setPage={setPage}
          rowCount={rowCount}
          filteredItems={filteredItems}
          hasSearchFilter={hasSearchFilter}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </CardBody>
    </Card>
    
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">New Test</ModalHeader>
              <ModalBody>
              <Select
                label="Eye Side"
                placeholder="Select side of eye"
                defaultSelectedKeys={["right"]}
                disallowEmptySelection
                isRequired
                name="eyeSide"
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
                name="description"
                  label="Description"
                  placeholder="Enter description"
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} type="submit">
                  Save
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  );
};

export default DRClassificationTable;
