import { prisma } from "../utils/prisma.server";
import bcrypt from "bcryptjs";

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  weightGoal?: number,
  allergies?: string[],
  dislikes?: string[],
  favoriteFoods?: string[]
) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
      weightGoal,
      allergies: {
        create: allergies?.map((allergy) => ({ name: allergy })) || [],
      },
      dislikes: { set: dislikes || [] },
      favoriteFoods: { set: favoriteFoods || [] },
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null;
  }
  return user;
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      weightGoal: true,
      allergies: true,
      dislikes: true,
      favoriteFoods: true,
    },
  });
}
