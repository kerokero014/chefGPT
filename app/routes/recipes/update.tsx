import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;

  if (!id || !title) {
    return json({ error: "Missing fields" }, { status: 400 });
  }

  const updatedRecipe = await prisma.recipe.update({
    where: { id },
    data: { title },
  });

  return json(updatedRecipe);
};
