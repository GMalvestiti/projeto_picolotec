import SideNavManager from "@/app/components/dashboard/sidenav/sidenav-manager";
import { Box, Toolbar } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
