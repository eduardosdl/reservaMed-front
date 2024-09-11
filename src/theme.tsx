import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3A71E',
      light: '#F6B84D',
      dark: '#BA7C15',
      contrastText: '#000000',
    },
    secondary: {
      main: '#3E5463',
      light: '#667A8B',
      dark: '#2B3A45',
      contrastText: '#ffffff',
    },
  },
});

export default theme;
