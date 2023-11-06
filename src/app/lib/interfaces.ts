export interface SideNavProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

export interface SideNavItemsProps {
  open: boolean;
  items: {
    text: string;
    href: string;
    icon: React.ReactNode;
  }[];
}
