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
import { signIn, signOut, useSession } from "next-auth/react";

export const UserDropdown = () => {
  const { data: session, status } = useSession();
  // console.log("session", session);
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
        <DropdownItem key="profile" textValue="My Profile">
          My profile
        </DropdownItem>
        <DropdownItem key="settings" textValue="Settings">
          Settings
        </DropdownItem>
        <DropdownItem key="activity" textValue="Activity">
          Activity
        </DropdownItem>
        <DropdownItem key="support" textValue="Support">
          Support
        </DropdownItem>
        {session !== null ? (
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            onPress={() => signOut()}
            textValue="Log Out"
          >
            Log Out
          </DropdownItem>
        ) : (
          <DropdownItem
            key="login"
            color="primary"
            className="text-primary"
            onPress={() => signIn()}
            textValue="Log In"
          >
            Log In
          </DropdownItem>
        )}

        <DropdownItem key="switch" textValue="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
