import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const ingredients = formData.get("ingredients") as string;
  const instructions = formData.get("instructions") as string;
  const nutritionalValue = formData.get("nutritionalValue") as string;

  if (!title || !ingredients || !instructions) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const recipe = await prisma.recipe.create({
    data: { title, ingredients, instructions, nutritionalValue },
  });

  return json(recipe);
};