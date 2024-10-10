import { ReactNode } from 'react';
import { Event, LocalHospital, MenuBook, Person } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { NavItem } from './NavItem';

import { useDrawerContext } from '../contexts/drawerContext';

interface NavDrawerProps {
  children: ReactNode;
}

export function NavDrawer({ children }: NavDrawerProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/logo-name.png"
              style={{ padding: '0 32px', width: '100%' }}
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <NavItem
                name="Pacientes"
                icon={<Person />}
                path="/admin/patients"
              />
              <NavItem
                name="Médicos"
                icon={<LocalHospital />}
                path="/admin/doctors"
              />
              <NavItem
                name="Consultas"
                icon={<Event />}
                path="/admin/consults"
              />
              <NavItem
                name="Historico"
                icon={<MenuBook />}
                path="/admin/consults/record"
              />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        marginLeft={smDown ? 0 : theme.spacing(28)}
        padding={theme.spacing(2)}
      >
        {children}
      </Box>
    </>
  );
}
