import { writeFile } from "fs/promises";

export async function POST(request) {
  try {
    return new Response(
      JSON.stringify({ message: "Upload made successfully!" })
    );
  } catch (error) {
    console.log(error);
  }
}