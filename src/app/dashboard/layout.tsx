"use client";

import SideNavManager from '@/app/components/dashboard/sidenav/sidenav-manager';
import Box from '@mui/material/Box';

import { DrawerHeader } from '../components/dashboard/sidenav/sidenav-header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavManager />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
