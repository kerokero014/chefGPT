import { Form, useActionData, redirect } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "../../utils/prisma.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json({ error: "Missing credentials" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; ${
        process.env.NODE_ENV === "production" ? "Secure" : ""
      }`,
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Login</h1>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      <Form method="post" className="space-y-4">
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
          Log in
        </button>
      </Form>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="text-blue-500">
          Register
        </a>
      </p>
    </div>
  );
}
