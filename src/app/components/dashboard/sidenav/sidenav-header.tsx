import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { SideNavProps } from '@/app/lib/interfaces';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.primary.main,
  ...theme.mixins.toolbar,
}));

export default function SideNavHeader({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: Readonly<SideNavProps>) {
  return (
    <DrawerHeader>
      
      <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
  );
}
