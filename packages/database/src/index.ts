import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

export const prisma = new PrismaClient();

/**
 * Ensures that a user exists in the Harmony database.
 * If the user doesn't exist (e.g., first time accessing the app after SSO login),
 * it creates a shadow user record to maintain foreign key integrity.
 */
export async function ensureUserExists(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    return user;
  }

  return await prisma.user.create({
    data: {
      id: userId,
    },
  });
}

