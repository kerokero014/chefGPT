import { Link, useFetcher } from "@remix-run/react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import type UserInter from "~/Data/User.interface";

export default function Navbar({ user }: { user: UserInter | null }) {
  const fetcher = useFetcher();

  const handleLogout = () => {
    fetcher.submit(null, { method: "post", action: "/logout" });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "grey.900", px: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          ChefGPT
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {user ? (
            <Button
              component={Link}
              to={`/user/profile?userId=${user.id}`}
              sx={{ color: "white", textTransform: "none" }}
            >
              {user.firstName} {user.lastName}
            </Button>
          ) : (
            <Typography color="white">Guest</Typography>
          )}
          {user && (
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
          )}
          <Button onClick={handleLogout} sx={{ color: "white" }}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
