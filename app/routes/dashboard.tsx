import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserSession } from "../utils/auth.server";
import Navbar from "~/components/Navbar";
import { getUserById } from "~/services/userService";
import User from "~/Data/User.interface";

// Import MUI components
import { Container, Typography } from "@mui/material";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request);
  const user = await getUserById(userId);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <Container>
      <Navbar user={user} />
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard, {user.firstName} {user.lastName}!
      </Typography>
    </Container>
  );
}
