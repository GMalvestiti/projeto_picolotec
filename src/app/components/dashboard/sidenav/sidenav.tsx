import { SideNavProps } from "@/app/lib/interfaces";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";

import SideNavHeader from "./sidenav-header";
import SideNavItems from "./sidenav-items";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const items = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: <SpaceDashboardOutlinedIcon />,
  },
  {
    text: "Simulador",
    href: "/dashboard/simulador",
    icon: <CalculateOutlinedIcon />,
  },
];

const items_registro = [
  {
    text: "Veículos",
    href: "/dashboard/veiculos",
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
];

export default function SideNav({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: Readonly<SideNavProps>) {
  return (
    <Drawer variant="permanent" open={open}>
      <SideNavHeader
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Divider />
      <SideNavItems open={open} items={items} />
      <Divider />
      <SideNavItems open={open} items={items_registro} />
    </Drawer>
  );
}

export { drawerWidth };
