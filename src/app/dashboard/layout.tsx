import SideNavManager from "@/app/components/dashboard/sidenav/sidenav-manager";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

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
