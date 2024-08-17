import { Box, Paper } from "@mui/material";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";

export default function Register() {
  return (
    <Box sx={{ height: '100vh', width: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={10} sx={{ width: 350, px: 2, py: 4, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <TextInput label='Senha' />
        <PasswordInput label='Senha' />
        <PasswordInput label='Confirmar Senha' />
        <Button sx={{ mt: 1 }}>Entrar</Button>
        <Button variant='outlined' sx={{ mt: 1 }}>Criar Conta</Button>
      </Paper>
    </Box>
  )
}