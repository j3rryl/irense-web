import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import React from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { toast } from "react-toastify";

const PatientActions = ({row}) => {
  const router = useRouter()
  const onDelete = async()=>{
    try {
        const response = await fetch(
          `/api/patients/${row?.id}`,
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
          setTimeout(() => {
            router.refresh();
            mutate("/api/patients");
          }, 1000);
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
          >
            Update
          </DropdownItem>
          <DropdownItem
            key="view"
          >
            View
          </DropdownItem>
          <DropdownItem
            key="delete"
            color="danger"
            onPress={()=>onDelete()}
            className="text-danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PatientActions;
