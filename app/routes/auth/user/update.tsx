import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "../../../utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = Number(formData.get("userId"));
  const weightGoal = Number(formData.get("weightGoal"));
  const allergies = (formData.get("allergies") as string)?.split(",") || [];
  const dislikes = (formData.get("dislikes") as string)?.split(",") || [];
  const favoriteFoods = (formData.get("favoriteFoods") as string)?.split(",") || [];

  if (!userId) {
    return json({ error: "User ID required" }, { status: 400 });
  }

  const profile = await prisma.profile.update({
    where: { userId },
    data: { weightGoal, dislikes, favoriteFoods },
  });

  // Update allergies separately
  await prisma.allergy.deleteMany({ where: { profileId: profile.id } });

  for (const allergy of allergies) {
    await prisma.allergy.create({
      data: { name: allergy, profileId: profile.id },
    });
  }

  return json({ message: "Profile updated successfully", profile });
};
