import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export function App() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ height: '100vh', width: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ width: 350, my: 4, mx: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <TextField label="Email" variant="outlined" size="small" />
        <TextField label="Senha" variant="outlined" size="small"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
          }}
        />
        <Button variant='contained' sx={{ mt: 1, textTransform: 'none' }}>Entrar</Button>
        <Button variant='outlined' sx={{ mt: 1 }}>Criar Conta</Button>
      </Paper>
    </Box>
  );
}