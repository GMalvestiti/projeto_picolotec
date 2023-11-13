"use client";

import { useState } from "react";

import SideNav from "./sidenav";
import TopBar from "./topbar";

export default function SideNavManager() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideNav
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
    </>
  );
}
