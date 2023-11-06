"use client";

import { useState } from 'react';

import SideNav from './sidenav';

export default function SideNavManager() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SideNav
      open={open}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}
    />
  );
}
