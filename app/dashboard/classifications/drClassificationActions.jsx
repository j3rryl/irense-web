import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import React from "react";
import NextLink from "next/link";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DRClassificationActions = ({row}) => {
  const router = useRouter()
  const onDelete = async()=>{
    try {
        const response = await fetch(
          `/api/classifications/${row?.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
  
        if (response.ok) {
          toast.success(responseData?.message);
            router.refresh();
            mutate("/api/classifications");
        } else {
          toast.error(responseData?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Unknown Error, please contact System Administrator.");
      } 
  }
  return (
    <div className="relative flex justify-start items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" variant="solid">
            Action
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="update"
            as={NextLink}
            href={`/dashboard/classifications/edit/${row?.id}`}
          >
            Update
          </DropdownItem>
          <DropdownItem
            key="view"
            as={NextLink}
            href={`/dashboard/classifications/view/${row?.id}`}
          >
            View
          </DropdownItem>
          <DropdownItem
            key="delete"
            color="danger"
            className="text-danger"
            onPress={()=>onDelete()}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DRClassificationActions;
