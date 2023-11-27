"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";

export const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://media.licdn.com/dms/image/C4E03AQHatm-utj-cFA/profile-displayphoto-shrink_800_800/0/1638098803049?e=2147483647&v=beta&t=qUhOB1NIgajsgdXEE3oD3akI81UI_wdwjFO-ig5mIFg"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="settings">My profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="settings">Activity</DropdownItem>
        <DropdownItem key="settings">Support</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger">
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
