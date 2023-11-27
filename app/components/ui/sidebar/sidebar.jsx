"use client";
import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import UsersIcon from "../icons/sidebar/users-icon";
import LaptopIcon from "../icons/sidebar/laptop-icon";
import GraduateIcon from "../icons/sidebar/graduate-icon";
import FileIcon from "../icons/sidebar/file-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<LaptopIcon />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname.includes("/physicians")}
                title="Physicians"
                icon={<UsersIcon />}
                href="/dashboard/physicians"
              />
              <SidebarItem
                isActive={pathname.includes("/patients")}
                title="Patients"
                icon={<GraduateIcon />}
                href="/dashboard/patients"
              />
              <SidebarItem
                isActive={pathname.includes("/classifications")}
                title="Classifications"
                icon={<FileIcon />}
                href="/dashboard/classifications"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
