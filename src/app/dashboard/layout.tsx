import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SideNav from '@/app/components/dashboard/sidenav';
 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box sx={{ display: 'flex' }}>
        
        <SideNav />
        <Box 
            component="main" 
            sx={{ flexGrow: 1, p: 2 }}
        >
            {children}
        </Box>
    </Box>
  );
}