import { prisma } from "./prisma";
import { generateShortCode } from "./generateShortCode";

export async function createLink(originalUrl: string) {
  if (!originalUrl) {
    throw new Error("URL is required");
  }

  // Basic URL validation
  try {
    new URL(originalUrl);
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
      originalUrl,
      shortCode,
    },
  });

  return link;
}