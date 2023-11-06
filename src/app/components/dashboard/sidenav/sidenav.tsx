import { SideNavProps } from "@/app/lib/interfaces";

import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

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
    icon: <SpaceDashboardOutlinedIcon />
  },
  {
    text: "Simulador",
    href: "/dashboard/simulador",
    icon: <CalculateOutlinedIcon />
  },
  {
    text: "Financeiro",
    href: "/dashboard/financeiro",
    icon: <AccountBalanceWalletOutlinedIcon />
  },
  {
    text: "Agenda",
    href: "/dashboard/agenda",
    icon: <CalendarMonthOutlinedIcon />
  },
];

const items_registro = [
  {
    text: "Veículos",
    href: "/dashboard/veiculos",
    icon: <DirectionsCarFilledOutlinedIcon />
  },
  {
    text: "Clientes",
    href: "/dashboard/clientes",
    icon: <AccountBoxOutlinedIcon />
  },
  {
    text: "Localidades",
    href: "/dashboard/localidades",
    icon: <AddLocationAltOutlinedIcon />
  }
]

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
      <SideNavItems
        open={open}
        items={items}
      />
      <Divider />
      <SideNavItems
        open={open}
        items={items_registro}
      />
    </Drawer>
  );
}
