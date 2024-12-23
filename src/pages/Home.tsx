import { Card, Container } from '@mui/material';
import {Button} from '../components/Button';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 4,
          gap: 2,
        }}
      >
        <Button sx={{ width: 1 }} onClick={() => navigate('/admin')}>
          Administrador
        </Button>
        <Button sx={{ width: 1 }} onClick={() => navigate('/doctors')}>
          Médico
        </Button>
        <Button sx={{ width: 1 }} onClick={() => navigate('/patients')}>
          Paciente
        </Button>
      </Card>
    </Container>
  );
}
