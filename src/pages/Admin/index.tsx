import { Outlet } from 'react-router-dom';
import { NavDrawer } from '../../components/NavDrawer';

export function Admin() {
  return (
    <>
      <NavDrawer>
        <Outlet />
      </NavDrawer>
    </>
  );
}
