import { prisma } from "./prisma";
import { generateShortCode } from "./generateShortCode";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export async function createLink(url: string) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!url) {
    throw new Error("URL is required");
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }

  let shortCode = generateShortCode();

  // Ensure uniqueness
  let existing = await prisma.link.findUnique({
    where: { shortCode },
  });

  while (existing) {
    shortCode = generateShortCode();
    existing = await prisma.link.findUnique({
      where: { shortCode },
    });
  }

  const link = await prisma.link.create({
    data: {
      url,
      shortCode,
      user: {
        connect: { id: user!.id },
      },
    },
  });

  return link;
}