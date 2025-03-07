import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/services/userService";
import User from "../Data/User.interface";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";
import WeightGoals from "../components/weightGoals";
import SavedRecipes from "../components/SavedRecipes";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }

  const user = await getUserById(userId);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return json({ user });
};

export default function UserProfile() {
  const { user } = useLoaderData<{ user: User }>();

  const weightGoal = 70;
  const weightData = [
    { date: "2025-01-01", weight: 75 },
    { date: "2025-02-01", weight: 73 },
    { date: "2025-03-01", weight: 71 },
  ];
  const savedRecipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      ingredients: "Spaghetti, ground beef, tomato sauce",
      instructions: "Cook spaghetti, brown beef, mix with sauce",
      nutritionalValue: "500 calories per serving",
      createdAt: new Date("2025-01-01"),
    },
    {
      id: 2,
      title: "Chicken Curry",
      ingredients: "Chicken, curry powder, coconut milk",
      instructions: "Cook chicken, add curry powder, mix with coconut milk",
      nutritionalValue: "600 calories per serving",
      createdAt: new Date("2025-02-01"),
    },
  ];

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileCard user={user} />
          <WeightGoals weightGoal={weightGoal} weightData={weightData} />
        </div>
        <div className="mt-4">
          <SavedRecipes recipes={savedRecipes} />
        </div>
      </div>
    </div>
  );
}
