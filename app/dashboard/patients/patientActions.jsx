import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import React from "react";
import NextLink from "next/link";

const PatientActions = () => {
  return (
    <div className="relative flex justify-end items-center gap-2">
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
            href={`/dashboard`}
          >
            Update
          </DropdownItem>
          <DropdownItem
            key="view"
            as={NextLink}
            href={`/dashboard`}
          >
            View
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PatientActions;
