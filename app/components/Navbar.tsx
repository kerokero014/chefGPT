import { Link, useFetcher } from "@remix-run/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import type UserInter from "~/Data/User.interface";
import { useEffect } from "react";

export default function Navbar({ user }: { user: UserInter | null }) {
  const fetcher = useFetcher();

  const handleLogout = () => {
    fetcher.submit(null, { method: "post", action: "/logout" });
  };

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        bgcolor: "grey.900",
        px: 3,
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          ChefGPT
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
          )}

          <Button onClick={handleLogout} sx={{ color: "white" }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
