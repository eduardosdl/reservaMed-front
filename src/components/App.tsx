import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { routes } from '../routes';
import { theme } from '../theme';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-center" />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
