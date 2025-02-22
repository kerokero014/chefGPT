import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = Number(formData.get("id"));

  if (!id) {
    return json({ error: "Recipe ID required" }, { status: 400 });
  }

  await prisma.recipe.delete({
    where: { id },
  });

  return json({ success: true });
};
