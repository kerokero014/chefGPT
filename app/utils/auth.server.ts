import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_token",
    secure: process.env.NODE_ENV === "development",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    httpOnly: true,
    path: "/",
  },
});

export async function createUserSession(userId: number) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect("/dashboard", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return session.get("userId");
}

export async function requireUserSession(request: Request) {
  const userId = await getUserSession(request);
  if (!userId) throw redirect("/auth/login");
  return userId;
}