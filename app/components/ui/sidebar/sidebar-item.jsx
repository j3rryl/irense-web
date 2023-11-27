import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

export const SidebarItem = ({ icon, title, isActive, href = "" }) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary-700 [&_svg_path]:fill-white"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
          // isActive ? "!border-l-8 border-primary" : "hover:bg-default-100",
          // "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        
        onClick={handleClick}
      >
        {icon}
        <span className={clsx(isActive && "text-white", "ml-1 text-sm")}>{title}</span>

        {/* <span className="ml-1 text-sm">{title}</span> */}
      </div>
    </NextLink>
  );
};
