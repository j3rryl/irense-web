"use client";
import { NextUIProvider } from "@nextui-org/system";

const AuthContext = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default AuthContext;
