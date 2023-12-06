import bcrypt from "bcrypt";
import prisma from "@/lib/config";

export async function POST(request) {
  const body = await request.json();
  let user;
  try {

    user = await prisma.physician.findUnique({
      where: {
        email: body.email,
      },
    });  
    if (user && user?.status !== "active") {
      return new Response(
        JSON.stringify({
          error:
            "This account has been deactivated. Please contact your System administrator.",
        }),
        {
          status: 403,
        }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({
        error: "Service is currently unavailable. Please try again later.",
      }),
      {
        status: 503,
      }
    );
  }
  if (user && (await bcrypt.compare(body?.password, user?.password))) {
    console.log(user);
    const result = {
      ...user,
      success: true,
    };
    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify({ error: "Invalid credentials!" }), {
      status: 401,
    });
  }
}
