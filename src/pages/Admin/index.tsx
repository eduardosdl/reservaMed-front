import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import DrawerNav from '../../components/DrawerNav';

export default function Admin() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DrawerNav />
      <Outlet />
    </Box>
  );
}
