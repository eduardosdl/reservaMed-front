import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { routes } from '../routes';
import { theme } from '../theme';
import { DrawerProvider } from '../contexts/drawerContext';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawerProvider>
        <RouterProvider router={routes} />
      </DrawerProvider>
    </ThemeProvider>
  );
}
