import { signIn, signOut } from "next-auth/react";

export const handleSignIn = async (data) => {
  const response = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
    callbackUrl: `${data.callbackUrl}`,
  });
  return response;
};
export const handleSignOut = () => {
  signOut({ callbackUrl: "/authentication" });
};
