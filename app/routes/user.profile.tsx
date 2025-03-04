import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/services/userService";
import User from "~/Data/User.interface";
import ProfileCard from "~/components/ProfileCard";
import Navbar from "~/components/Navbar";

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

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{user.firstName}&#39;s Profile</h1>
      </div>
      <ProfileCard user={user} />
    </div>
  );
}
