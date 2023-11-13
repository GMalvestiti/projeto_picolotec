import SideNavManager from "@/app/components/dashboard/sidenav/sidenav-manager";
import { Box, Toolbar } from "@mui/material";

import { cookies } from "next/headers";
import { logout } from "../actions/auth";

const verifyLoggedIn = function () {
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")
    ? cookieStore.get("user_id")
    : undefined;

  if (userId === undefined) {
    logout();
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  verifyLoggedIn();

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavManager />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
