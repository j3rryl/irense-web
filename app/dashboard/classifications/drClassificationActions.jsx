import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import React from "react";
import NextLink from "next/link";

const DRClassificationActions = ({row}) => {
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
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DRClassificationActions;
