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
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

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
            width={80}
            height={80}
            src="https://media.licdn.com/dms/image/C4E03AQHatm-utj-cFA/profile-displayphoto-shrink_800_800/0/1638098803049?e=2147483647&v=beta&t=qUhOB1NIgajsgdXEE3oD3akI81UI_wdwjFO-ig5mIFg"
            alt="Mogei logo for GESS South Sudan"
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
