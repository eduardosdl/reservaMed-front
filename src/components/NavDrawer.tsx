import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts/drawerContext';
import {
  Box,
  Divider,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { NavItem } from './NavItem';

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
              <NavItem name="Pacientes" icon="person" path="/admin/patients" />
              <NavItem name="Médicos" icon="person" path="/admin/doctors" />
              <NavItem name="Consultas" icon="person" path="/admin/consults" />
              <NavItem name="Historico" icon="person" path="/admin/history" />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box>{children}</Box>
    </>
  );
}
