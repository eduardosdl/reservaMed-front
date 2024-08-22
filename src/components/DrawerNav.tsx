import { Box, Drawer, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import NavItem from './NavItem';

export default function DrawerNav() {
  return (
    <Drawer sx={{ width: 250 }} variant="permanent">
      <Box
        sx={{
          width: 250,
          height: 1,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        role="presentation"
      >
        <List>
          <NavItem name="Pacientes" icon={<InboxIcon />} path="/patients" />
          <NavItem name="Médicos" icon={<InboxIcon />} path="/doctors" />
        </List>
      </Box>
    </Drawer>
  );
}
