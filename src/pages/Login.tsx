import { useNavigate } from 'react-router-dom';
import { Box, Paper, Snackbar } from '@mui/material';

import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // event.preventDefault();
    try {
      await login(email, password);
    } catch {
      setShowSnackbar(true)
    }
  };

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
        component='form'
      >
        <TextInput label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput label="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ mt: 1 }}
          disabled={isLoading}
          onClick={handleSubmit}
          loading={isLoading}
          type='submit'
        >
          Entrar
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/register')}
        >
          Criar Conta
        </Button>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={error || "Falha ao realizar login"}
      />
    </Box>
  );
}
