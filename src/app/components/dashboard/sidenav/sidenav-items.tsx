import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SideNavItemsProps } from '@/app/lib/interfaces';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

export default function SideNavItems({
  open,
  items,
}: Readonly<SideNavItemsProps>) {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            href={item.href}
            LinkComponent={Link}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              backgroundColor: pathname === item.href ? theme.palette.primary.main : "white",
              color: pathname === item.href ? "white" : "black",
              '&:hover': {
                color: "white",
                backgroundColor: theme.palette.primary.light
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
