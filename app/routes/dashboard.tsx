import { LoaderFunction, json } from "@remix-run/node";
import { requireUserSession } from "../utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request);
  return json({ userId });
};

export default function Dashboard() {
  return <h1>Welcome to Your Dashboard!</h1>;
}
