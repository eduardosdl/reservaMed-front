import { Outlet } from 'react-router-dom';
import { NavDrawer } from '../../components/NavDrawer';
import { DrawerProvider } from '../../contexts/drawerContext';

export function Admin() {
  return (
    <DrawerProvider>
      <NavDrawer>
        <Outlet />
      </NavDrawer>
    </DrawerProvider>
  );
}
