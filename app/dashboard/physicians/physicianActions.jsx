import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import React from "react";
import NextLink from "next/link";

const PhysicianActions = ({row}) => {
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
            href={`/dashboard/physicians/${row?.id}`}
          >
            View
          </DropdownItem>
          <DropdownItem
            key="delete"
            as={NextLink}
            color="danger"
            className="text-danger"
            href={`/dashboard`}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PhysicianActions;
