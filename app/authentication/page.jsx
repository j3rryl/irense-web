"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { handleSignIn } from "../api-handlers/authentication";
import { MailIcon } from "../components/icons/mail-icon";
import { LockIcon } from "../components/icons/lock-icon";

const AuthPage = () => {
  const [isLoading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

  useEffect(() => {}, [searchParams]);
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    try {
      const response = await handleSignIn({ email, password, callbackUrl });

      if (response?.ok) {
        router.refresh();
        setLoading(false);
        toast.success(`Login successful...`);
        setTimeout(async () => {
          router.replace(`${response?.url}`);
          // router.refresh();
        }, 1000);
      } else {
        toast.error(`${response?.error}`);
        setLoading(false);
      }
    } catch (error) {
      // console.error(error);
    }
  };
  return (
    <>
      <section className="bg-gray-200 w-full h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <Image
              isBlurred
              className="w-8 h-8 mr-2"
              // src="/img/mogei.png"
              alt="logo"
            />
            iRense
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <Input
                  label="Email"
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  isRequired
                  variant="bordered"
                />
                <Input
                  label="Password"
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  isRequired
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  color="primary"
                  className="w-full"
                >
                  Sign in
                </Button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
