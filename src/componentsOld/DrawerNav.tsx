import { Box, Drawer, List } from '@mui/material';
import { LocalHospital, Person, Event, MenuBook } from '@mui/icons-material';

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
        <img src="/logo-name.png" style={{ padding: '0 32px' }} />
        <List
          sx={{
            width: 250,
            mt: 8,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <NavItem name="Pacientes" icon={<Person />} path="/admin/patients" />
          <NavItem
            name="Médicos"
            icon={<LocalHospital />}
            path="/admin/doctors"
          />
          <NavItem name="Consultas" icon={<Event />} path="/admin/consults" />
          <NavItem name="Historico" icon={<MenuBook />} path="/admin/history" />
        </List>
      </Box>
    </Drawer>
  );
}
