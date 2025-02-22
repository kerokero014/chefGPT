import { LoaderFunction, json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const recipes = await prisma.recipe.findMany();
  return json(recipes);
};
