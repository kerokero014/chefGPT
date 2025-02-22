import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

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
        </header>
        <div className="flex gap-4">
          <Link to="/auth/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/auth/register">
            <button className="btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
