import { Link, useFetcher } from "@remix-run/react";
import type  UserInter from "~/Data/User.interface";

export default function Navbar({ user }: { user: UserInter | null }) {
  const fetcher = useFetcher();

  const handleLogout = () => {
    fetcher.submit(null, { method: "post", action: "/logout" });
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-bold">
        ChefGPT
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <Link to={`/user/profile?userId=${user.id}`} className="text-white">
            {user.firstName} {user.lastName}
          </Link>
        ) : (
          <span className="text-white">Guest</span>
        )}
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      </div>
    </nav>
  );
}
