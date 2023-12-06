// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000"];
export default withAuth(
  async function middleware(request) {
    const token = await getToken({req: request});
    const origin = request.headers.get("origin");
    const { pathname } = request.nextUrl;
  },
  {
    callbacks: {
      authorized({ token }) {
        // console.log("token", token);
        return token;
      },
    },
  }
);
export const config = {
  matcher: [
    "/dashboard/:path",
  ],
};
