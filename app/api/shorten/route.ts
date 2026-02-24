import { NextResponse } from "next/server";
import { createLink } from "@/lib/createLink";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const link = await createLink(url);

    return NextResponse.json({
      success: true,
      shortCode: link.shortCode,
      shortUrl: `${process.env.PUBLIC_URL}/${link.shortCode}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message},
      { status: 400 }
    );
  }
}