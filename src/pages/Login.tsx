import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';

import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';

export default function Login() {
  const navigate = useNavigate();
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
          rowGap: 1,
        }}
      >
        <TextInput label="Senha" />
        <PasswordInput label="Senha" />
        <Button sx={{ mt: 1 }}>Entrar</Button>
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate('/register')}
        >
          Criar Conta
        </Button>
      </Paper>
    </Box>
  );
}
