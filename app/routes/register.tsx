import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUser } from "../services/userService";
import ActionData from "../Data/ActionData";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const weightGoal = parseFloat(formData.get("weightGoal") as string);
  const allergies = (formData.get("allergies") as string).split(",").map(item => item.trim());
  const dislikes = (formData.get("dislikes") as string).split(",").map(item => item.trim());
  const favoriteFoods = (formData.get("favoriteFoods") as string).split(",").map(item => item.trim());

  const errors: ActionData["errors"] = {};
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (!weightGoal) {
    errors.weightGoal = "Weight goal is required";
  }
  if (Object.keys(errors).length) {
    return json<ActionData>({ errors });
  }

  await createUser(
    email,
    password,
    firstName,
    lastName,
    weightGoal,
    allergies,
    dislikes,
    favoriteFoods
  );

  return redirect("/login");
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Form
        method="post"
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Register
        </h1>
        {actionData?.errors?.email && (
          <p className="text-red-500">{actionData.errors.email}</p>
        )}
        {actionData?.errors?.password && (
          <p className="text-red-500">{actionData.errors.password}</p>
        )}
        {actionData?.errors?.firstName && (
          <p className="text-red-500">{actionData.errors.firstName}</p>
        )}
        {actionData?.errors?.lastName && (
          <p className="text-red-500">{actionData.errors.lastName}</p>
        )}
        {actionData?.errors?.weightGoal && (
          <p className="text-red-500">{actionData.errors.weightGoal}</p>
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
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="weightGoal"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Weight Goal
          </label>
          <input
            type="text"
            name="weightGoal"
            id="weightGoal"
            placeholder="Weight Goal"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            id="allergies"
            placeholder="Allergies"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="dislikes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dislikes
          </label>
          <input
            type="text"
            name="dislikes"
            id="dislikes"
            placeholder="Dislikes"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="favoriteFoods"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Favorite Foods
          </label>
          <input
            type="text"
            name="favoriteFoods"
            id="favoriteFoods"
            placeholder="Favorite Foods"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Register
        </button>
      </Form>
    </div>
  );
}
