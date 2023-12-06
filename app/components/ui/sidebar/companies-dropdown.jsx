import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import React, { useState } from "react";
import { AcmeIcon } from "../../icons/acme-icon";
import { AcmeLogo } from "../../icons/acmelogo";
import { BottomIcon } from "../../icons/bottom-icon";

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState({
    name: "iRense",
    location: "Nairobi",
    logo: <AcmeIcon />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Image
            as={NextImage}
            priority
            width={75}
            height={75}
            src="/images/retina.jpg"
            className="w-auto h-auto"
            alt="Company logo"
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {company.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {/* {company.location} */}
            </span>
          </div>
          {/* <BottomIcon /> */}
        </div>
      </DropdownTrigger>
    </Dropdown>
  );
};
