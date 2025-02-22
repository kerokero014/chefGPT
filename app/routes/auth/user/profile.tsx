import { LoaderFunction, json } from "@remix-run/node";
import { prisma } from "../../../utils/prisma.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const userId = Number(url.searchParams.get("userId"));

  if (!userId) {
    return json({ error: "User ID required" }, { status: 400 });
  }

  const userProfile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!userProfile) {
    return json({ error: "User profile not found" }, { status: 404 });
  }

  return json(userProfile);
};
