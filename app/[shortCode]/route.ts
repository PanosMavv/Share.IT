import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const resolvedParams = await params;
  const { shortCode } = resolvedParams;

  if (!shortCode) {
    return NextResponse.json(
      { success: false, message: "No short code provided" },
      { status: 400 }
    );
  }

  // Look up the link in the database
  const link = await prisma.link.findUnique({
    where: { shortCode },
  });

  if (!link) {
    return NextResponse.json(
      { success: false, message: "Link not found" },
      { status: 404 }
    );
  }

  // Increment clicks
  await prisma.link.update({
    where: { shortCode },
    data: { clicks: link.clicks + 1 },
  });

  // Redirect
  return NextResponse.redirect(link.originalUrl);
}