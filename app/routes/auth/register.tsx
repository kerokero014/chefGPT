import { Form, useActionData, redirect } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "../../utils/prisma.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!email || !password || !firstName || !lastName) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return json({ error: "User already exists" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      profile: {
        create: { firstName, lastName },
      },
    },
  });

  // Generate JWT Token for the new user
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  // Set the JWT token as a cookie and redirect to dashboard or login
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; ${
        process.env.NODE_ENV === "production" ? "Secure" : ""
      }`,
    },
  });
};

export default function RegisterPage() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      <Form method="post" className="space-y-4">
        <input name="firstName" placeholder="First Name" className="input" />
        <input name="lastName" placeholder="Last Name" className="input" />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn">
          Register
        </button>
      </Form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-500">
          Log in
        </a>
      </p>
    </div>
  );
}
