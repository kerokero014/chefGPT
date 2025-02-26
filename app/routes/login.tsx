import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { verifyUser } from "../services/userService";
import ActionData from "../Data/ActionData";
import { createUserSession, getUserSession } from "../utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserSession(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: ActionData["errors"] = {};
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (Object.keys(errors).length) {
    return json<ActionData>({ errors });
  }

  const user = await verifyUser(email, password);
  if (!user) {
    return json<ActionData>(
      { errors, formError: "Invalid email or password" },
      { status: 400 }
    );
  }

  return createUserSession(user.id);
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Form
        method="post"
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Login
        </h1>
        {actionData?.formError && (
          <p className="text-red-500">{actionData.formError}</p>
        )}
        {actionData?.errors?.email && (
          <p className="text-red-500">{actionData.errors.email}</p>
        )}
        {actionData?.errors?.password && (
          <p className="text-red-500">{actionData.errors.password}</p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
