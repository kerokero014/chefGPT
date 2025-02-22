import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "ChefGPt" },
    {
      name: "Senior Project - Recipe and Meal Management System using OpenAI",
      content: "Welcome to ChefGPT",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to ChefGPT
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Your AI-powered recipe and meal management system.
            <br />
            Discover, create, and manage your meals effortlessly.
          </p>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Register
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
