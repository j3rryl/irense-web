"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Layout } from "../components/ui/layout/layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import usePusher from "../utils/usePusher";

const LayoutProvider = ({ children }) => {
  usePusher()
  return (
    <NextUIProvider>
      <Layout>
        <div className=" h-full my-10 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
          {children}
        </div>
      </Layout>
      <ToastContainer/>
    </NextUIProvider>
  );
};

export default LayoutProvider;
