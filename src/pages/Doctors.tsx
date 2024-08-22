import { Box, Paper, Typography } from '@mui/material';

export default function Doctors() {
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
      <Paper
        elevation={10}
        sx={{
          width: 350,
          px: 2,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Pagina Doctors</Typography>
      </Paper>
    </Box>
  );
}
