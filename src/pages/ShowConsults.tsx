import { AlertColor, Container, TextField } from '@mui/material';
import Button from '../components/Button';
import TableConsult from '../components/TableConsult';
import Consult from '../types/consult';
import { useState } from 'react';
import ConsultService from '../services/ConsultService';
import Toast from '../components/Toast';
import formatCpf from '../utils/formatCpf';

export default function ShowConsults() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [patientCpf, setPatientCpf] = useState('');
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar médicos',
  );

  function handleSearchCpf() {
    ConsultService.getConsultsByCpf(patientCpf.replace(/\D/g, ''))
      .then(consultsData => setConsults(consultsData))
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
  }

  return (
    <Container maxWidth="md" sx={{ maxHeight: '100vh', py: 4 }}>
      <Toast
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />
      <TextField
        name="CPF do paciente"
        size="small"
        inputProps={{ maxLength: 14 }}
        value={formatCpf(patientCpf)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPatientCpf(event.target.value);
        }}
        sx={{ mb: 4, mr: 2 }}
      />
      <Button onClick={handleSearchCpf}>Buscar</Button>
      <TableConsult consultsData={consults} realoadData={handleSearchCpf} />
    </Container>
  );
}
