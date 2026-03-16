import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  if (!shortCode) {
    return NextResponse.json(
      { success: false, message: "No short code provided" },
      { status: 400 }
    );
  }

  const link = await prisma.link.findUnique({
    where: { shortCode },
  });

  if (!link) {
    return NextResponse.json(
      { success: false, message: "Link not found" },
      { status: 404 }
    );
  }

  // Extract request metadata
  const userAgent = req.headers.get("user-agent") || undefined;
  const referrer = req.headers.get("referer") || undefined;

  // Increment click counter (atomic)
  await prisma.link.update({
    where: { id: link.id },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  // Log individual click event
  await prisma.click.create({
    data: {
      linkId: link.id,
      device: userAgent,
      referrer: referrer,
    },
  });

  return NextResponse.redirect(link.url);
}